interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  sectionShow?: string | null;
}

const MySection: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  sectionShow,
}) => {
  //console.log(sectionShow);
  return (
    <div>
      <fieldset
        className={`${sectionShow && "border border-gray-200 p-3 dark:border-gray-500 dark:bg-white/[0.03]"}`}
      >
        {sectionShow && (
          <legend className="text-gray-500 px-1 ms-[-4px]"> {title}</legend>
        )}
        {children}
      </fieldset>
    </div>
  );
};

export default MySection;
