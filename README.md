# eslint-plugin-mathieu-eveillard

Additional rules enforcing some architectural aspects as well as code style

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-mathieu-eveillard`:

```sh
npm install eslint-plugin-mathieu-eveillard --save-dev
```

## Usage

Add `eslint-mathieu-eveillard` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-mathieu-eveillard"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-mathieu-eveillard/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                         | Description                                                |
| :----------------------------------------------------------- | :--------------------------------------------------------- |
| [no-restricted-imports](docs/rules/no-restricted-imports.md) | Forbid given imports from given packages into given paths. |

<!-- end auto-generated rules list -->


