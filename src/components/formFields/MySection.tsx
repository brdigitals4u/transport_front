interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const MySection: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div>
      <fieldset className="border border-gray-200 p-3 dark:bg-white/[0.03]">
        <legend className="text-gray-500 px-1 ms-[-4px]"> {title}</legend>
        {children}
      </fieldset>
    </div>
  );
};

export default MySection;
