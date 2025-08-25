interface IProps {
  children: React.ReactNode;
}
export default function AboutLayout({ children }: IProps) {
  return <section>{children}</section>;
}
