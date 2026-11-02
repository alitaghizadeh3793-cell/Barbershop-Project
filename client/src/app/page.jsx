import Content from "@/app/Components/Content/Content";
import Dashboard from "@/app/Components/Dashboard/Dashboard";
import Section from "./Components/Section/Section";
import Package from "./Components/Package/Package";
import Comment from "./Components/Comment/Comment";

export default function Home() {
  return (
    <div>
      <Content />
      <Dashboard />
      <Section />
      <Package />
      <Comment />
    </div>
  );
}
