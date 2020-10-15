import styles from "../styles/Workflow.module.css";

export const Workflow = ({Workflow}) => {
  return (
    <div className={styles.container}>
      <p>{JSON.stringify(Workflow)}</p>
    </div>
  );
};
