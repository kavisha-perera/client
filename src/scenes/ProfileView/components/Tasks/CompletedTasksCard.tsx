import {Task} from "../../../../types/Task";
import {Badge, Card} from "flowbite-react";
import {HiChip, HiPencil} from "react-icons/hi";
import {Link, useParams} from "react-router-dom";
import {Answer, AnswerStatus,} from "../../../../types/Task"
import {useEffect, useState} from "react";
import { TaskService } from "../../../../services/taskService";

interface CompletedTaskProps {
  task: Task,
}

function CompletedTaskCard({ task }: CompletedTaskProps) {
  const { id } = useParams();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [, setIsCompleted] = useState<boolean>(false);
  const intlDateFormatter = Intl.DateTimeFormat('en', {
    hour: "numeric",
    minute: "numeric",
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    fetchAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAnswers = async () => {
    const answerList = await TaskService.getAnswersByProfile(task.id, id!);
    setAnswers(answerList);
    setIsCompleted(
      answerList.filter((answer) => answer.status === AnswerStatus.COMPLETED).length !== 0
    );
  }

  return (
    <div className="cursor-pointer">
      <Link to={`/tasks/${task.id}`}>
        <Card>
          <div className="w-52 h-16">
            <h5 className="text-m line-clamp-1 font-medium tracking-tight text-gray-900 dark:text-white">
              {task.title}
            </h5>
            {answers.length > 0 && (
              <div>
                <h6 className="text-sm line-clamp-1 tracking-tight text-gray-900 dark:text-white">
                  {intlDateFormatter.format(new Date(answers[answers.length - 1].createdAt * 1000))}
                </h6>
              </div>
            )}
            <div className="flex justify-end items-center gap-2 mt-2 mb-1">
              {
                {
                  "DEV": <Badge color="info" icon={HiChip}>Developer Task</Badge>,
                  "QUIZ": <Badge color="info" icon={HiPencil}>Quiz Task</Badge>,
                }[task.type]
              }
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default CompletedTaskCard;
