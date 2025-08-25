interface IProps {
  children: React.ReactNode;
}
export default function RecipeLayout({ children }: IProps) {
  return <section>{children}</section>;
}
