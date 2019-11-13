# TDD-Max
> Utility library which helps Test Driven Development in Cycling '74 Max

***This package works only in Max 8 or higher***

## What is TDD?
- Test Driven Development
- “Test-First” approach in which unit tests are written before code or patcher
- See more at [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)
## Why TDD is important?
- TDD means fewer bugs, higher quality software, and a razor focus.  
- TDD allows problems to be detected as early as possible  
- See more in [this article](https://medium.com/@gondy/the-importance-of-test-driven-development-f80b0d02edd8)

## Install
Use this command at your project root.
```
yarn add -D tdd-max
```
## Usage
To use TDD-Max, you need to prepare two things, "test patcher" and "test code"
Instead of setting up them manually, you can use our boilerplate with this command.
```
yarn tdd-max --init
```

You can pass an argument to indicate the destination path.
```
yarn tdd-max --init ./projects/test
```

### Test patcher  
You can make your test patcher as shown below. If you would like to use this as your boilerplate, this is accessible at `boilerplate/test/test.maxpat` which is copied by the `--init` command in the previous section.  
  
<img width="1440" alt="Screen Shot 2019-05-29 at 18 11 32" src="https://user-images.githubusercontent.com/31060964/58545345-054c9900-823e-11e9-952e-21e33690fa07.png">  

### Test codes
Here is an example of how you can write your test codes.  
```js
// boilerplate/test/code/add1.test.js

const { expect } = require('chai');
const TARGET = 'add1';
test('adds 1 to input number', async () => {
  expect(await fetch(TARGET, { add1: 3 })).to.equal(4);
  expect(await fetch(TARGET, { add1: 0.1 })).to.equal(1.1);
  expect(await fetch(TARGET, { add1: 100000 })).to.equal(100001);
  expect(await fetch(TARGET, { add1: -2.1 })).to.equal(-1.1);
});
```
More example codes can be found at [boilerplate folder](https://github.com/spectral-lab/TDD-Max/tree/master/boilerplate/test)  

#### Notes
- Test codes should be named as `*.test.js`.
- Test codes sould be placed in the same folder as your test patcher. You can also use subfolders.
-  - `tdd` will search those folders and load your codes automatically even if you have multiple test files.  

#### Dependencies of your test codes  
If you'd like to use some assertion library such as 'chai', please be aware that those libraries should be installed to your project root, not to the folder where the TDD-Max is installed. Sending `npm install chai` message to `tdd` patcher will not work, so please use `yarn add -D [package-name]`.  

## Alternative installation
Though it is highly recommended to use yarn, you can manually install this library in case you are not familiar to that kind of dependency managers. 
1. Download zip file from [release page](https://github.com/spectral-lab/TDD-Max/releases)
1. Unzip
1. Copy all the contents into a folder which is listed in your File Preference, such as `/Users/YourName/Documents/Max 8/Library`
1. Restart Max application if it is running.

## PR is welcome!
Though you can file an issue, PR is much more appreciated. The code is simple enough to modify quickly.

## For contributors
### Prerequisite
- Node 10.16
- Yarn
- Max 8.1.0 or higher
### Set up your dev environment
1. Clone this repository
1. Add the path of your cloned directory to `Options >> File Preference` of your Max
### Publish
1. Indicate the version number in the `package.json`
1. commit and push
1. run `npm publish`
Tag will be automatically genearated
