import { useNavigate } from "react-router-dom";
import type { ActivityPreviewProps } from "../../types";
import "./ActivityPreview.css"

export default function ActivityPreview({ activity }: ActivityPreviewProps) {
    const navigate = useNavigate()
    return (
      <button 
      onClick={()=>navigate(`/characters/${activity.character}/activities/${activity._id}`)}
      className="activity-preview">
        {activity.title}
      </button>

  );
}
