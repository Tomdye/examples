import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createParentListMixin, { ParentListMixin } from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createWidget from 'dojo-widgets/createWidget';
// import createContainer from '../common/createContainer';
import createCard from '../card/createCard';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardsListState = RenderMixinState & StatefulChildrenState & {
	cards?: any[];
}

type CardsListOptions = RenderMixinOptions<CardsListState>;

export type CardsList = RenderMixin<CardsListState> & StatefulChildren<Child> & ParentListMixin<Child>;

type CardsListFactory = ComposeFactory<CardsList, CardsListOptions>;

function manageChildren(this: any) {
	const { cards } = this.state;
	const cardWidgets = cards.map((card: any) => createCard({
		state: card
	}));
	this.append(cardWidgets);
}

const createCardsList: CardsListFactory = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: createParentListMixin,
		initialize(instance: CardsList, options: CardsListOptions) {
			instance.on('statechange', manageChildren);
		}
	})
	.extend({
		tagName: 'section'
	});

export default createCardsList;
