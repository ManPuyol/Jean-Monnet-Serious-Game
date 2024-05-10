type Props = {
  children: React.ReactNode;
};

export const FeedWrapper = ({ children }: Props) => {
  return <div className="flex flex-col flex-1 relative gap-6 top-0 pb-10">{children}</div>;
};
