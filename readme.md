
This repository demonstrates a problem when adding a library using symlink and try to build it with ng-packagr.

This project has been created using the angular cli tool with two workspaces and each with a library module.

Libraries work fine within the workspace, but breaks when referenced between workspaces
in this case the link is done using 'npm install ../subModule/dist/b' this creates a symlink to the build output folder in node-modules.

This fails for `build-angular` and `ng-packagr` In case of the `build-angular:browser` there is a fix to set the `preserveSymlinks` to `true`, however I've been unable to find such a flag for `ng-packagr`.

The console output when running `ng build a` from `./mainModule`
```
Building Angular Package
Building entry point 'a'
Compiling TypeScript sources through ngc

BUILD ERROR
Error during template compile of 'NgModule'
  Function calls are not supported in decorators but 'ɵmakeDecorator' was called.
: Unexpected value 'BModule in C:/git/symlink-error/subModule/dist/b/b.d.ts' imported by the module 'AModule in C:/git/symlink-error/mainModule/projects/a/src/lib/a.module.ts'. Please add a @NgModule annotation.

Error: Error during template compile of 'NgModule'
  Function calls are not supported in decorators but 'ɵmakeDecorator' was called.
: Unexpected value 'BModule in C:/git/symlink-error/subModule/dist/b/b.d.ts' imported by the module 'AModule in C:/git/symlink-error/mainModule/projects/a/src/lib/a.module.ts'. Please add a @NgModule annotation.

    at Object.<anonymous> (C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ngc\compile-source-files.js:40:68)
    at Generator.next (<anonymous>)
    at C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ngc\compile-source-files.js:7:71
    at new Promise (<anonymous>)
    at __awaiter (C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ngc\compile-source-files.js:3:12)
    at Object.compileSourceFiles (C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ngc\compile-source-files.js:17:12)
    at Object.<anonymous> (C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ng-v5\entry-point\ts\compile-ngc.transform.js:31:32)
    at Generator.next (<anonymous>)
    at C:\git\symlink-error\mainModule\node_modules\ng-packagr\lib\ng-v5\entry-point\ts\compile-ngc.transform.js:7:71
    at new Promise (<anonymous>)
```

This is of cause after having build the `b` module form the `./subModule` folder.


As a small note the error you get when you do not have the `preserveSymlinks` is the ones below, it is not easy to decipher that this is because the Angular core module is included twice.
```
WARNING in ../subModule/node_modules/@angular/core/fesm5/core.js 4982:15-36
Critical dependency: the request of a dependency is an expression
```

```
WARNING in ../subModule/node_modules/@angular/core/fesm5/core.js 4994:15-102
Critical dependency: the request of a dependency is an expression
```