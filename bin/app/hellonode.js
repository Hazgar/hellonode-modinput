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

(function() {
    var splunkjs        = require("splunk-sdk");
    var Async           = splunkjs.Async;
    var ModularInputs   = splunkjs.ModularInputs;
    var Logger          = ModularInputs.Logger;
    var Event           = ModularInputs.Event;
    var Scheme          = ModularInputs.Scheme;
    var Argument        = ModularInputs.Argument;
    var utils           = ModularInputs.utils;

    // The version number should be updated every time a new version of the JavaScript SDK is released.
    var SDK_UA_STRING = "splunk-sdk-javascript/1.6.0";

    exports.getScheme = function() {
        var scheme = new Scheme("HelloNode Module Input");

        scheme.description = "Randomly generate events";
        scheme.useExternalValidation = true;
        scheme.useSingleInstance = false;

        scheme.args = [
            new Argument({
                name: "whoareyou",
                dataType: Argument.dataTypeString,
                description: "Who are you?",
                requiredOnCreate: true,
                requiredOnEdit: false
            }),
            new Argument({
                name: "whereareyou",
                dataType: Argument.dataTypeString,
                description: "Where are you?",
                requiredOnCreate: true,
                requiredOnEdit: false
            }),
            new Argument({
                name: "howareyou",
                dataType: Argument.dataTypeString,
                description: "How are you?",
                requiredOnCreate: false,
                requiredOnEdit: false
            }),
            new Argument({
                name: "whatisyourfavoritecolor",
                dataType: Argument.dataTypeString,
                description: "What is your favorite color?",
                requiredOnCreate: false,
                requiredOnEdit: false
            }),
            new Argument({
                name: "magic",
                dataType: Argument.dataTypeString,
                description: "What is the answer to all the question in the universe?",
                requiredOnCreate: true,
                requiredOnEdit: true
            }),
        ];

        return scheme;
    };

    exports.validateInput = function(definition, done) {
        var whoareyou = definition.parameters.whoareyou;
        var whereareyou = definition.parameters.whereareyou;
        var howareyou = definition.parameters.howareyou;
        var whatisyourfavoritecolor = definition.parameters.whatisyourfavoritecolor;
        var magic = definition.parameters.magic;

        try {
            if (whatisyourfavoritecolor.toLowerCase() == "rainbow") {
                done(new Error(whatisyourfavoritecolor + " really?"));
            } else if (magic != 42) {
                done(new Error(magic + " is not likely to be the answer."));
            }
        }
        catch (e) {
            done(e);
        }
    };

    exports.streamEvents = function(name, singleInput, eventWriter, done) {
        var whoareyou = singleInput.whoareyou;
        var whereareyou = singleInput.whereareyou;
        var howareyou = singleInput.howareyou;
        var whatisyourfavoritecolor = singleInput.whatisyourfavoritecolor;
        var magic = singleInput.magic;

        Logger.info(name, "creating an event for " + whoareyou);
        var event = new Event({
            stanza: name,
            sourcetype: "hellonode",
            data: 'who="' + whoareyou + '" where="' + whereareyou + '" how="' + howareyou + '" color="' + whatisyourfavoritecolor + '"'
        });
        eventWriter.writeEvent(event);
        Logger.info(name, "event created for " + whoareyou + " in " + whereareyou);
    };

    ModularInputs.execute(exports, module);
})();
