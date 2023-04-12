import styles from "./Button.module.css";

type Props = {
  title: string;
  onClick: () => void;
};

const Button = ({ title, onClick }: Props) => {
  return (
    <button onClick={() => onClick()} className={styles.btn}>
      {title}
    </button>
  );
};

export default Button;
