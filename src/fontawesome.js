// src/fontawesome.js

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faEye, faEyeSlash, faSpinner, faCheck, faThumbsUp, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes, faEye, faEyeSlash, faSpinner, faCheck, faThumbsUp, faSync);

export { FontAwesomeIcon };
