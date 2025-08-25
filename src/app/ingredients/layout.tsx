interface IProps {
  children: React.ReactNode;
}
export default function IngredientsLayout({ children }: IProps) {
  return <section>{children}</section>;
}
