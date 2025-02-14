import { ComputedProxyStateExample } from "app/[lang]/example-projects/proxy-state/computed-text";
import { Code } from "bright";

export default function ComputedStateExample() {
	return (
		<div>
			<ComputedProxyStateExample />
			<Code theme={"dracula-soft"} lang="tsx">{`// read value from proxy
const name = useProxyState<string>("name");
const firstNumber = useProxyState<number>("firstNumber", 0);
const secondNumber = useProxyState<number>("secondNumber", 1);

...

<input
    type="number"
    name="firstNumber"
    defaultValue={firstNumber.value}
    onChange={(e) => {
      // update value using the proxy. no setState needed!
      firstNumber.value = Number(e.target.value);
    }}
/>`}</Code>
		</div>
	);
}
