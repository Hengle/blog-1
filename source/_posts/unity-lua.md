---
layout: post
title: Unity常见lua解决方案性能比较
date: 2016/7/31
tags: Unity
updated: 2016/9/28
---

之前由于项目需要，我比较了下Unity常见的几个lua解决方案；最近应鑫哥约稿，整理了一下。

<!--more-->

# 测试说明

Unity不支持热更新这事情一直是一个谜一样的痛点，特别是在我第一个项目上线之后，发现每次更新代价太大了...可惜官方Roadmap上迟迟没有出现这个功能。昨天在群里还看到琨少说天下直接热更新Python脚本，羡慕嫉妒ing。

为了解决这个问题，uwa之前分享过[Android平台热更新解决方案](http://blog.uwa4d.com/archives/HotFix.html)：直接替换dll是一种解决方式(但iOS上因为使用IL2CPP所以没法这么干，而且这事儿是商业原因不是技术问题)；还有一个比较常见的解决方案就是用lua。考虑到我们有不少同事之前写的是Cocos2d-lua，而且也有对应后端框架如Skynet，因此在下一个项目我们考虑使用Unity+lua的方式来开发。

在项目正式开坑之前，必然要进行一些调研工作。我发现网上已经有一些benchmark，但是具体的测试环境、测试版本不够明晰，有些资料也有一定的年头了...因此我维护了一份可以运行的[unity_lua_benchmark](https://github.com/qiankanglai/unity_lua_benchmark)，注明了框架版本、测试环境以及结果比较，希望对大家有所帮助；如果对结果存疑也可以下载源代码后自行比较。

# 测试内容

测试结果中包含了以下三种解决方案的比较：

- [slua](https://github.com/pangweiwei/slua), [commit #5388a6b](https://github.com/pangweiwei/slua/commit/5388a6b5acd4b7d09704806a770267ec00d6773d)
- [ulua](https://github.com/jarjin/ulua), [commit #dbe98bc](https://github.com/jarjin/ulua/commit/dbe98bce0a3fd169935617dec9e9fe129de8832b) (作者已不再维护，转至tolua)
- [tolua](https://github.com/topameng/tolua),  [commit #2ac8c9e](https://github.com/topameng/tolua/commit/2ac8c9e82bddbd22f681660b16ba316c78cf861f)

注1：当然还存在其他解决方案如CsTolua，作者精力有限无法一一测试，欢迎Pull Request。

注2：为了不引起[无谓的争端](https://github.com/qiankanglai/unity_lua_benchmark/issues/2)，强调下本测试只考虑**解决方案本身性能差异**，至于有人说 “ulua在ios下面用的是lua原生vm，跟slua用的luajit有啥好比的？”，我只能说如果他愿意提供luajit版本的话，我很乐意再多做一次比较；但是如果要求我来实现luajit的话，抱歉无能为力，我只是从使用者角度进行测试而已。

注3：还有想说的一点就是，选择框架不应该只考虑性能，还需要考虑可维护性、稳定性等方面，本测试**仅供性能层面的参考**。

# Benchmark Results 测试结果

每个测试顺序执行五次，然后重启。这里感谢[侑虎科技UWA](https://www.uwa4d.com/)进行了最新版本在不同移动设备上的测试，原报告来自侑虎科技博客 [Unity项目常见Lua解决方案性能比较](http://blog.uwa4d.com/archives/lua_perf.html)。

## Android

以下为UWA在Android上对高、中、低配置的三款设备进行测试后得到的平均数据，图中下方的表格部分为柱状图的准确数值，而其数值表示的是完成测试用例所需的时间，单位为毫秒。

- 低端设备：三星 S3 (Android OS 4.3)
![android_1](/images/lua_benchmark/android_1.png)
- 中端设备：红米 Note2 (Android OS 5.0.2)
![android_2](/images/lua_benchmark/android_2.png)
- 高端设备：三星S6 (Android OS 6.0.1)
![android_3](/images/lua_benchmark/android_3.png)

## iOS

以下为UWA在iOS上对armv7和arm64的两款设备进行测试后得到的平均数据，测试中使用了il2cpp＋Universal的发布方式，同时禁用了bitcode。图中下方的表格部分为柱状图的准确数值，而其数值表示的是完成测试用例所需的时间，单位为毫秒。

- armv7设备：iPhone 4s (OS 7.1.2)
![ios_1](/images/lua_benchmark/ios_1.png)
- arm64设备：iPhone 5s (OS 9.3.5)
![ios_2](/images/lua_benchmark/ios_2.png)
