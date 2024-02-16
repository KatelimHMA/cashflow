import ResumeItem from "../ResumeItem/ResumeItem";
import "./Resume.css";

function Resume({incomes, expenses, total}) {
 

  return (
    <div className="Resume-container">
        <ResumeItem title="Receitas" value={incomes}/>
        <ResumeItem title="Despesas" value={expenses}/>
        <ResumeItem title="Total" value={total}/>
    </div>

  );
}

export default Resume;