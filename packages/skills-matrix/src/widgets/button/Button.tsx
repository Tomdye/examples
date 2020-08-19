import { create, tsx } from '@dojo/framework/core/vdom';
import Button, { ButtonProperties } from '@dojo/widgets/button';

const factory = create().properties<ButtonProperties>();

export default factory(function ({ properties, children }) {
	return (
		<Button
			{...properties()}
		>
			{children()}
		</Button>
	);
});
