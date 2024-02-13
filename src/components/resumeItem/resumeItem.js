import "./resumeItem.css";
import { formatAmount} from "../../utils/transactionUtils";

function ResumeItem({title, value}) {

  return (
    <div className="Resume-item">
        <div className="Resume-header">{title}</div>
        <div className="Resume-body">{formatAmount(value)}</div>
    </div>
  );
}
export default ResumeItem;