/**
 * @fileoverview Forbid given imports from given packages into given folders.
 * @author Mathieu Eveillard
 */
"use strict";

const RuleTester = require("eslint").RuleTester;
const path = require("path");
const rule = require("../../../lib/rules/no-restricted-imports");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const fileFromDomain = path.resolve(__dirname, "src/core/index.ts");

const fileOutsideOfDomain = path.resolve(__dirname, "src/views/index.tsx");

const options = [
  {
    packages: ["fizz"],
    path: "src/buzz",
  },
  {
    packages: ["@reduxjs/toolkit", "redux", "react-redux"],
    path: "src/core",
  },
];

ruleTester.run("no-restricted-imports", rule, {
  valid: [
    {
      code: `
        import foo from "bar";
        import foo from "bar";
      `,
      options,
      filename: fileFromDomain,
    },
    {
      code: `
        import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
      `,
      options,
      filename: fileOutsideOfDomain,
    },
  ],

  invalid: [
    {
      code: `
        import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
      `,
      options,
      errors: [
        {
          message:
            "Unauthorized import of package '@reduxjs/toolkit' into 'src/core'",
        },
      ],
      filename: fileFromDomain,
    },
    {
      code: `
        import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
      `,
      options,
      errors: [
        {
          message:
            "Unauthorized import of package 'react-redux' into 'src/core'",
        },
      ],
      filename: fileFromDomain,
    },
    {
      code: `
        import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
        import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
      `,
      options,
      errors: [
        {
          message:
            "Unauthorized import of package '@reduxjs/toolkit' into 'src/core'",
        },
        {
          message:
            "Unauthorized import of package 'react-redux' into 'src/core'",
        },
      ],
      filename: fileFromDomain,
    },
  ],
});
