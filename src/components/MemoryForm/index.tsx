import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Types } from "../../../types/actionsEnum";
import { MemoryOptions, Time } from "../../../types/memory";
import { Category, Difficulty } from "../../../types/memoryEnums";
import { MemoryContext } from "../../context/ContextProvider";
import "./style.css";

export default function MemoryForm() {
  const [, dispatch] = useContext(MemoryContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const optionsData = new FormData(e.target as HTMLFormElement);
    const time = optionsData.get("time") as string;

    const memoryOptions: MemoryOptions = {
      difficulty:
        Difficulty[optionsData.get("difficulty") as keyof typeof Difficulty],
      time: parseInt(time) as Time,
      category: Category[optionsData.get("category") as keyof typeof Category],
    };

    dispatch({ type: Types.setMemoryOptions, payload: memoryOptions });
    navigate("/playing");
  };

  return (
    <div className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Memory Options</h3>
        <div className="form_selecters_container">
          <select
            className="form_selecter"
            name="difficulty"
            defaultValue="EASY"
          >
            <option value="EASY">ease</option>
            <option value="MEDIUM">medium</option>
            <option value="HARD">hard</option>
          </select>

          <select className="form_selecter" name="time" defaultValue={60}>
            <option value={60}>01:00</option>
            <option value={45}>00:45</option>
            <option value={30}>00:30</option>
          </select>

          <select
            className="form_selecter"
            name="category"
            defaultValue="ANIME"
          >
            <option value="ANIME">Anime</option>
            <option value="CITIES">Cities</option>
          </select>
        </div>
        <input className="form_btn" type="submit" value="Start" />
      </form>
    </div>
  );
}
