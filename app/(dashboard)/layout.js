import Main from "@/components/main/Main";

export const metadata = {
  title: "ms plastic",
  description: "This is inventory management",
};

export default function DashboardLayout({ children }) {
  return (
    <section>
      <Main>{children}</Main>
    </section>
  );
}
