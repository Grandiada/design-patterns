import { TaskView } from "@/app/api/project-controller/viewModels";
import { startTransition, useEffect, useState } from "react";
import { useClientId } from "@/lib";
import { toast } from "react-toastify";
import { getProjects } from "@/app/api/project-controller";
import * as Styled from "./withServerSentConnection.styled";
import { Empty } from "antd";

// Тип для компонента, который принимает любые props
type ComponentType<P = object> = React.ComponentType<P>;

interface WithServerSentProjectsProps {
  task: TaskView;
}

interface WithServerSentProjectsWrapperProps {
  onConnected: () => void;
  isConnected: boolean;
}

export function withServerSentProjects<P extends WithServerSentProjectsProps>(
  WrappedComponent: ComponentType<P>
): ComponentType<WithServerSentProjectsWrapperProps> {
  const WithServerSentProjects = ({
    onConnected,
    isConnected,
  }: WithServerSentProjectsWrapperProps) => {
    const [projects, setProjects] = useState<TaskView[]>([]);
    const id = useClientId();

    useEffect(() => {
      if (!id) return;
      const eventSource = new EventSource(
        `/api/project-controller?userId=${id}`
      );

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (Array.isArray(message)) {
          message.forEach((m) => {
            toast(m.message);
          });
        }

        startTransition(async () => {
          const updatedViews = await getProjects();
          setProjects(updatedViews);
          onConnected();
        });
      };

      eventSource.onerror = (err) => {
        console.error("SSE Error:", err);
        eventSource.close();
      };

      return () => eventSource.close();
    }, [id, onConnected]);

    if (!isConnected) {
      return null;
    }

    if (!projects.length) {
      return <Empty />;
    }

    return (
      <Styled.Content>
        {projects.map((task) => (
          <WrappedComponent {...({ task } as P)} key={task.id} />
        ))}
      </Styled.Content>
    );
  };

  WithServerSentProjects.displayName = `WithServerSentProjects(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithServerSentProjects;
}
