import moment from "moment";
import { UserInitials } from "./UserInitials";
import { ReactNode } from "react";

interface commentProps {
  userName: string;
  countMark: string;
  comment: string;
  color: string;
  children?: ReactNode;
}

export const CommentCard = ({
  userName,
  countMark,
  comment,
  color,
  children,
}: commentProps) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  let newDate;

  const newDataString = String(today.toISOString()).substring(0, 10);

  const diff = moment(newDataString, "YYYY-MM-DD").diff(
    moment(countMark, "YYYY-MM-DD")
  );
  const diffDays = String(moment.duration(diff).asDays());

  if (diffDays === "0") {
    newDate = "há algumas horas";
  }
  if (diffDays === "1") {
    newDate = `há ${diffDays} dia`;
  }
  if (Number(diffDays) > 1) {
    newDate = `há ${diffDays} dias`;
  }

  return (
    <li className="flex flex-col gap-3 h-max">
      <div className="w-full flex place-content-between">
        <div className="flex place-content-between items-center gap-2 w-max text-grey-1">
          <UserInitials name={userName} color={color} />
          <p className="text-body-2-500">{userName}</p>
          <small className="text-xs font-normal text-grey-3">{newDate}</small>
        </div>
        <div>{children}</div>
      </div>
      <div className="w-full h-max">
        <p className="text-body-2-400 leading-6 text-grey-2">{comment}</p>
      </div>
    </li>
  );
};
