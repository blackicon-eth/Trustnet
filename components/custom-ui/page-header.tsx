interface PageHeaderProps {
  children: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full h-[36px]">
      {children}
    </div>
  );
};
