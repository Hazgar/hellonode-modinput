// Copyright 2014 Splunk, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

exports.setup = function() {
    var splunkjs                = require('splunk-sdk');
    var ModularInputs           = splunkjs.ModularInputs;
    var ValidationDefinition    = ModularInputs.ValidationDefinition;
    var utils                   = ModularInputs.utils;

    splunkjs.Logger.setLevel("ALL");
    
    return {
        "Validation Definition tests": {
            setUp: function(done) {
                done();
            },

            "Parse produces expected result": function(test) {
                try {
                    var found = ValidationDefinition.parse(utils.readFile(__filename, "./data/validation.xml"));

                    var expected = new ValidationDefinition();
                    expected.metadata =  {
                        "server_host": "tiny",
                        "server_uri": "https://127.0.0.1:8089",
                        "checkpoint_dir": "/opt/splunk/var/lib/splunk/modinputs",
                        "session_key": "123102983109283019283",
                        "name": "aaa"
                    };
                    expected.parameters = {
                        "whoareyou": "someone",
                        "whereareyou": "somewhere",
                        "howareyou": "good",
                        "whatisyourfavoritecolor": "green",
                        "magic": "42",
                        "disabled": "0",
                        "index": "default",
                    };

                    test.same(found.metadata, expected.metadata);
                    test.equals(found.metadata["server_host"], expected.metadata["server_host"]);
                    test.equals(found.metadata["server_uri"], expected.metadata["server_uri"]);
                    test.equals(found.metadata["checkpoint_dir"], expected.metadata["checkpoint_dir"]);
                    test.equals(found.metadata["session_key"], expected.metadata["session_key"]);
                    test.equals(found.metadata["name"], expected.metadata["name"]);

                    test.same(found.parameters, expected.parameters);
                    test.equals(found.parameters["whoareyou"], expected.parameters["whoareyou"]);
                    test.equals(found.parameters["whereareyou"], expected.parameters["whereareyou"]);
                    test.equals(found.parameters["howareyou"], expected.parameters["howareyou"]);
                    test.equals(found.parameters["whatisyourfavoritecolor"], expected.parameters["whatisyourfavoritecolor"]);
                    test.equals(found.parameters["magic"], expected.parameters["magic"]);
                    test.equals(found.parameters["disabled"], expected.parameters["disabled"]);
                    test.equals(found.parameters["index"], expected.parameters["index"]);

                    test.same(found, expected);
                }
                catch (e) {
                    test.ok(e);
                }

                test.done();
            }
        }
    };
};

var splunkjs    = require('splunk-sdk');
var test        = require('nodeunit').testCase;

var suite = exports.setup();
module.exports = test(suite);
