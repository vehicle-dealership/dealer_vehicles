interface UserProps {
  name: string;
  color: string;
  bigSize?: boolean;
}

export const UserInitials = ({
  name = "placeholder",
  color,
  bigSize = false,
}: UserProps) => {
  const splitName = name.split(" ");
  const firstLetterFirstName = splitName[0].charAt(0);
  const firstLetterLastName = splitName[splitName.length - 1].charAt(0);
  const initials = firstLetterFirstName + firstLetterLastName;

  return (
    <div
      style={{ backgroundColor: color }}
      className={`flex items-center justify-center rounded-full text-white-fixed ${
        bigSize ? "w-20 h-20 sm:w-30 sm:h-30" : "w-8 h-8 "
      }`}>
      <span className={`${bigSize && "text-heading-2-500"}`}>{initials}</span>
    </div>
  );
};
