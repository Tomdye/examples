import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { Widget, WidgetProperties, WidgetFactory } from '@dojo/widget-core/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';

export interface FocusableTextProperties extends WidgetProperties {
	focused?: boolean;
	placeholder?: string;
	value?: string;
	onKeyUp?: (event?: KeyboardEvent) => void;
	onBlur?: (event?: Event) => void;
};

export type FocusableTextInput = Widget<FocusableTextProperties> & {
	onKeyUp: (event?: KeyboardEvent) => void;
	onBlur: (event?: Event) => void;
	afterUpdate?: (element: HTMLInputElement) => void;
}

export interface FocusableTextInputFactory extends WidgetFactory<FocusableTextInput, FocusableTextProperties> { }

const createFocusableTextInput: FocusableTextInputFactory = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'input',

			type: 'text',

			onKeyUp(this: FocusableTextInput, event?: KeyboardEvent) {
				this.properties.onKeyUp && this.properties.onKeyUp(event);
			},
			onBlur(this: FocusableTextInput, event?: Event) {
				this.properties.onBlur && this.properties.onBlur(event);
			},
			afterUpdate(this: FocusableTextInput, element: HTMLInputElement) {
				const focused = this.properties.focused;
				if (focused) {
					setTimeout(() => element.focus(), 0);
				}
				else if (!focused && document.activeElement === element) {
					element.blur();
				}
			},
			nodeAttributes: [
				function (this: FocusableTextInput): VNodeProperties {
					const { onKeyUp: onkeyup, onBlur: onblur, afterUpdate, afterUpdate: afterCreate } = this;
					const { placeholder, value = '' } = this.properties;

					return { afterUpdate, placeholder, innerHTML: value, value, afterCreate, onkeyup, onblur };
				}
			]
		}
	});

export default createFocusableTextInput;
