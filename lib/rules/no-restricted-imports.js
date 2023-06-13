/**
 * @fileoverview Forbid import of given packages into given paths
 * @author Mathieu Eveillard
 */
"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Forbid import of given packages into given paths",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: {
      unauthorizedImport:
        "Unauthorized import of package '{{ package }}' into '{{ path }}'",
    },
    fixable: null, // Or `code` or `whitespace`
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          packages: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            uniqueItems: true,
          },
          path: {
            type: "string",
          },
        },
        required: ["packages", "path"],
      },
      minItems: 1,
    },
  },

  create(context) {
    const fileName = context.getFilename();
    return {
      ImportDeclaration(node) {
        const importValue = node.source.value;
        context.options.forEach(({ packages, path }) => {
          if (fileName.includes(path) && packages.includes(importValue)) {
            context.report({
              messageId: "unauthorizedImport",
              data: {
                package: importValue,
                path,
              },
              node,
            });
          }
        });
      },
    };
  },
};
