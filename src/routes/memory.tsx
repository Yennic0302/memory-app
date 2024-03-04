import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { MemoryContext } from "../context/ContextProvider";
import Home from "../icons/Home";
import Restart from "../icons/Restart";
import { generateRandomArray } from "../utils/generateRandomValuesArray";
import "./memory.css";

const DIFICULTY_CLASSES = {
  8: "easy_memory",
  12: "medium_memory",
  16: "hard_memory",
};

let cardCount = 0;

export default function Memory() {
  const [{ memoryOptions }] = useContext(MemoryContext);
  const [cards, setCards] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [win, setWin] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);
  const [cardsCompleated, setCardsCompleted] = useState<string[]>([]);
  const navigate = useNavigate();

  const card_one = useRef<HTMLDivElement | null>(null);
  const card_two = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCards(generateRandomArray(memoryOptions.difficulty));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (play) {
        setTime((state) => state - 1);
      }
    }, 1000);

    if (time === 0 && play) {
      setLose(true);
      setPlay(false);
      clearInterval(timer);
    }

    if (win) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [play, win, time]);

  const handleImgLoading = () => {
    if (!pageLoaded) {
      setLoading(true);
      cardCount++;
      if (cardCount === cards.length * 2) {
        setLoading(false);
        setPlay(true);
        setPageLoaded(true);
        setTime(memoryOptions.time);
        cardCount = 0;
      }
    }
  };

  const handleCardApear = (element: React.RefObject<HTMLDivElement>) => {
    const elementChild = element.current?.children;
    if (elementChild?.length == 2) {
      elementChild[0].classList.add("card_appear");
      elementChild[1].classList.add("card_cover_hidden");
    }
  };

  const handleCardHide = (element: React.RefObject<HTMLDivElement>) => {
    const elementChild = element.current?.children;
    const fatherElement = element.current;
    if (elementChild?.length == 2) {
      elementChild[0].classList.remove("card_appear");
      fatherElement!.classList.add("card_hide");
      setTimeout(() => {
        elementChild[1].classList.remove("card_cover_hidden");
        fatherElement!.classList.remove("card_hide");
      }, 500);
    }
  };

  const evaluateCorrectCards = () => {
    const cardOneNumber = card_one.current!.getAttribute("content");
    const cardTowNumber = card_two.current!.getAttribute("content");
    if (cardOneNumber == cardTowNumber) {
      card_one.current?.classList.add("correct_cards");
      card_two.current?.classList.add("correct_cards");
      card_one.current = null;
      card_two.current = null;
      setScore((state) => state + 10);
      setCardsCompleted([...cardsCompleated, cardOneNumber as string]);
      if (cardsCompleated.length + 1 === cards.length / 2) {
        setPlay(false);
        setWin(true);
      }
    } else {
      setScore((state) => state - 5);
      setTimeout(() => {
        handleCardHide(card_one);
        handleCardHide(card_two);
        card_one.current = null;
        card_two.current = null;
      }, 500);
    }

    return;
  };

  const evaluateCards: MouseEventHandler<HTMLDivElement> = (e) => {
    if (win != false || lose != false) return;
    if (e.currentTarget.id == card_one.current?.id) return;

    if (
      cardsCompleated!.includes(
        e.currentTarget.getAttribute("content") as string
      )
    )
      return;
    if (card_one.current === null) {
      card_one.current = e.currentTarget as HTMLDivElement;
      handleCardApear(card_one);
      return;
    }
    if (card_one.current !== null && card_two.current === null) {
      card_two.current = e.currentTarget as HTMLDivElement;
      handleCardApear(card_two);
      evaluateCorrectCards();
      return;
    }
  };

  const restart = () => {
    setCards(generateRandomArray(memoryOptions.difficulty));
    setScore(0);
    setWin(false);
    setLose(false);
    setCardsCompleted([]);
    setPlay(true);
    setTime(memoryOptions.time);
    card_one.current = null;
    card_two.current = null;
    const reloadCards = document.getElementsByClassName("card");
    for (let i = 0; i < reloadCards.length; i++) {
      reloadCards[i].classList.remove("correct_cards");
      reloadCards[i].children[0].classList.remove("card_appear");
      reloadCards[i].children[1].classList.remove("card_cover_hidden");
    }
  };

  const home = () => {
    navigate("/");
  };

  return (
    <section className="memory_container">
      <article
        className={`memory ${DIFICULTY_CLASSES[memoryOptions.difficulty]}`}
      >
        {cards.map((card, index) => (
          <div
            className="card"
            id={index.toString()}
            key={index}
            content={card.toString()}
            onClick={evaluateCards}
          >
            <img
              id={`card-${index}`}
              className="card_img"
              src={`/imgs/${memoryOptions.category}/card${card}.jpg`}
              onLoad={handleImgLoading}
            />
            <img
              id={`cover_${index}`}
              className="card_cover"
              src="/imgs/assets/img-interrogatory.png"
              onLoad={handleImgLoading}
            />
          </div>
        ))}
      </article>
      <div className="memory_controls">
        <div className="details">
          <h2>
            Time: <span>{time}</span>
          </h2>
          <h2>
            Score: <span>{score}</span>
          </h2>
        </div>
        <nav className="nav">
          <div onClick={home}>
            <Home />
          </div>
          <div onClick={() => restart()}>
            <Restart />
          </div>
        </nav>
      </div>
      {loading && <Loader />}
      {(lose || win) && (
        <div className="modal_end_game">
          <div className="end_game_details">
            <h1 className={`title ${win ? "winner_title" : "loser_title"}`}>
              {win ? "Winner" : "Loser"}
            </h1>
            <div className="details">
              <h2>
                Time: <span>{time}</span>
              </h2>
              <h2>
                Score: <span>{score}</span>
              </h2>
            </div>
            <nav className="nav_end_game">
              <div onClick={home}>
                <Home />
              </div>
              <div onClick={() => restart()}>
                <Restart />
              </div>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
}
