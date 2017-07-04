---
layout: post
title: OSX下设置垂直同步
date: 2015/1/13
tags:
- OpenGL
---

最近发现一个逗比知识，osx下设置垂直同步貌似靠代码是无效的

{% codeblock lang:Objective-C %}
GLint swapInt = 1;
[[self openGLContext] setValues:&swapInt forParameter:NSOpenGLCPSwapInterval];
{% endcodeblock %}

<!--more-->

后来找到了这个[How to disable vsync on Mac OsX](http://stackoverflow.com/questions/12345730/how-to-disable-vsync-on-mac-osx)，不过选项的位置改到了Window-Quartz Debug Settings里面的Beam Sync中

![osx_vsync](/images/osx_vsync.png)