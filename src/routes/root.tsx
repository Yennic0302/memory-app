import MemoryForm from "../components/MemoryForm";
import MemoryTitle from "../components/MemoryTitle";
import "./root.css";
export default function Root() {
  return (
    <section className="root_container">
      <MemoryTitle />
      <MemoryForm />
    </section>
  );
}
