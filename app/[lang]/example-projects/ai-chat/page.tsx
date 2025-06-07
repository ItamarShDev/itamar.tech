import { getModels } from "app/api/chat/model-groups";
import { AIChatForm } from "./form";

export default function AIChatPage() {
	const models = getModels();
	return <AIChatForm models={models} />;
}
