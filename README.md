goodhood
========

An umbrella repository to hold all "semi open source" packages used by GoodHood exclusively.

## Setup

- (Install yarn `npm i -g yarn`)
- Install packages: `yarn`

## Preview

- `cd packages/your-package`
- `yarn start`
- or `HOST=192.168.1.3 PORT=1234 yarn start`

## Troubleshooting

### yarn install fails after setting pre-release version in @goodhood/icons

#### Scenario

- `packages/icons/package.json`: update version from (for example) `2.2.0` to `2.3.0-beta.0`
- `yarn`
- Fails with something like this: `error An unexpected error occurred: "expected workspace package to exist for \"chalk\"".`

#### Issue

It's a bug in yarn > 1.18. [There is a long thread on github about it.](https://github.com/yarnpkg/yarn/issues/7807#issuecomment-821722539).

#### Workaround

Pin `@goodhood/icons` version for all packages in workspace. It's sadly the best we can do right now.

🚨 **Watch out!** This may cause issues if you plan to do breaking changes. 🔥

- Open up root `package.json`
- Add the following section: (with adjusted version)
```json
{
  "resolutions": {
    "@goodhood/icons": "2.3.0-beta.0"
  }
}
```

#### Long-term outlook

- Bug won't be fixed most likely. [Yarn 1 was silently deprecated](https://raw.githubusercontent.com/yarnpkg/yarn/master/.github/ISSUE_TEMPLATE/bug_report.md)
- Update to yarn 2
