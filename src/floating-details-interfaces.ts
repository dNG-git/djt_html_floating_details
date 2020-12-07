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


import { DetailsProps, DetailsState } from '@dng-git/djt-html-details/src/details-interfaces';
import { Instance as PopperInstance } from '@dng-git/djt-html-popper';

/**
 * "FloatingDetails" properties interface
 *
 * @since v1.0.0
 */
export interface FloatingDetailsProps extends DetailsProps {
    floating?: string | boolean,
    floatingClass?: string,
    floatingContainerClass?: string
}

/**
 * "FloatingDetails" state interface
 *
 * @since v1.0.0
 */
export interface FloatingDetailsState extends DetailsState {
    cssFloatingClass: string,
    cssFloatingContainerClass: string,
    floating: boolean,
    floatingPopperInstance: PopperInstance
}
