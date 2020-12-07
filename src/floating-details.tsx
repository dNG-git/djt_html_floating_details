/**
 * direct JavaScript Toolbox
 * All-in-one toolbox to provide more reusable JavaScript features
 *
 * (C) direct Netware Group - All rights reserved
 * https://www.direct-netware.de/redirect?djt;html;floating_details
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * https://www.direct-netware.de/redirect?licenses;mpl2
 *
 * @license Mozilla Public License, v. 2.0
 */

import {
    ComponentContext,
    createElement,
    createRef,
    DynamicHtmlContent,
    Fragment,
    OriginalElementData,
    Ref
} from '@dng-git/djt-html-component';

import { FloatingDetailsProps, FloatingDetailsState } from './floating-details-interfaces';

import { createPopper } from '@dng-git/djt-html-popper';
import Details from '@dng-git/djt-html-details';

/**
 * "Details" provides an enhanced variant of the (X)HTML5 "details" element
 * including a floating container if opened.
 *
 * @author    direct Netware Group
 * @copyright (C) direct Netware Group - All rights reserved
 * @package   djt-html-floating-details
 * @since     v1.0.0
 * @license   https://www.direct-netware.de/redirect?licenses;mpl2
 *            Mozilla Public License, v. 2.0
 */
export default class FloatingDetails<
    P extends FloatingDetailsProps = FloatingDetailsProps,
    S extends FloatingDetailsState = FloatingDetailsState,
    C = ComponentContext
> extends Details<P, S, C> {
    /**
     * React reference to the native details DOM node
     */
    protected floatingNode: Ref<HTMLDivElement>;

    /**
     * reactjs.org: It is invoked immediately after a component is mounted
     * (inserted into the tree).
     *
     * @since v1.0.0
     */
    public componentDidMount() {
        super.componentDidMount();

        if (this.state.floating && this.floatingNode.current && (!this.state.floatingPopperInstance)) {
            this.setState({
                floatingPopperInstance: createPopper(
                    Details.getDomElement(this.detailsNode.current),
                    this.floatingNode.current,
                    {
                        modifiers: [
                            /* eslint-disable sort-keys */
                            { name: 'preventOverflow', enabled: false },
                            { name: 'arrow', enabled: false },
                            { name: 'flip', enabled: false },
                            { name: 'hide', enabled: false }
                            /* eslint-enable sort-keys */
                        ],
                        placement: 'bottom-start'
                    }
                )
            });
        }
    }

    /**
     * reactjs.org: It is invoked immediately before a component is unmounted
     * and destroyed.
     *
     * @since v1.0.0
     */
    public componentWillUnmount() {
        if (this.state.floatingPopperInstance) {
            this.state.floatingPopperInstance.destroy();

            this.floatingNode = undefined;
            this.setState({ floatingPopperInstance: null });
        }
    }

    /**
     * Called for tapping on the summary node to hide or show details.
     *
     * @param event Event object
     *
     * @since v1.0.0
     */
    public onTapToggleDetails(event: Event) {
        super.onTapToggleDetails(event);

        if (this.state.floating && this.floatingNode.current && this.state.isVisible) {
            void this.state.floatingPopperInstance.update();
        }
    }

    /**
     * Returns the React component content to be rendered.

     * @return React component content to be rendered
     * @since  v1.0.0
     */
    public render() {
        if (this.state.floating && (!this.floatingNode)) {
            this.floatingNode = createRef();
        }

        return (
            this.state.floating
            ? (
<>
    <div
        ref={ this.detailsNode }
        id={ this.state.id }
        className={
            this.state.cssNonNativeContainerClass
            + ' ' + this.state.cssFloatingClass
            + ' ' + (this.state.isVisible ? this.state.cssOpenedClass : this.state.cssClosedClass)
        }
    >
    <DynamicHtmlContent
        ref={ this.summaryNode }
        attributes={{ onpointerdown: this.onTapToggleDetails }}
        className={ this.state.cssNonNativeSummaryClass }
        content={ this.state.summary }
    />
    </div>
    <div
        ref={ this.floatingNode }
        className={ this.state.cssFloatingContainerClass + ' ' + (this.state.isVisible ? this.state.cssOpenedClass : this.state.cssClosedClass) }
        style={ (this.state.isVisible ? '' : { display: 'none', opacity: 0, visibility: 'hidden' }) }
    >
        <DynamicHtmlContent ref={ this.contentNode } content={ this.state.content } style={ { width: this.state.width } } />
    </div>
</>
            )
            : super.render()
        );
    }

    /**
     * Returns the static component name.
     *
     * @return Static component name
     * @since  v1.0.0
     */
    public static get componentName() {
        return 'djt-floating-details';
    }

    /**
     * reactjs.org: It is invoked right before calling the render method, both on
     * the initial mount and on subsequent updates.
     *
     * @param props Current props
     * @param state Current state
     *
     * @return Updated state values object; null otherwise
     * @since  v1.0.0
     */
    public static getDerivedStateFromProps(props: FloatingDetailsProps, state: FloatingDetailsState) {
        let _return = super.getDerivedStateFromProps(props, state) as FloatingDetailsState;

        if (state === null) {
            if (!_return) {
                _return = { } as FloatingDetailsState;
            }

            _return['cssFloatingClass'] = (props.floatingClass ? props.floatingClass : 'djt-floating-details');

            _return['cssFloatingContainerClass'] = (
                props.floatingContainerClass
                ? props.floatingContainerClass : 'djt-floating-details-container'
            );

            _return['floating'] = !([ '0', false ].includes(props.floating));

            if (_return.floating) {
                _return['isElementSizeRelevant'] = true;
                _return['isNativeImplementation'] = false;
                _return['isWindowResizeRelevant'] = true;
                _return['isVisible'] = false;
            }
        }

        return _return;
    }

    /**
     * Parses the original element data structure for summary and content nodes.
     *
     * @param data Original element data structure to be parsed
     *
     * @return Relevant content node properties
     * @since  v1.0.0
     */
    public static parseOriginalElementData(data: OriginalElementData) {
        return (
            data.name === 'djt-floating-details'
            ? this.parseOriginalElementDjtDetailsRootItems(data.children) : super.parseOriginalElementData(data)
        );
    }
}
