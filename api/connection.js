// establish a common mongodb connection
'use strict';
import mongoose from 'mongoose';

import {mongoURI} from '../config/database';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

export default mongoose;
