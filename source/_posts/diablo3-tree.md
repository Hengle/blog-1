---
layout: post
title: 暗黑3 2.5D树
date: 2016/4/10
tags:
- GameArtTricks
- Translation
updated: 2016/4/11
---

[原文链接](http://simonschreibt.de/gat/diablo-3-trees)

某次我看到暗黑3一张截图里的树，我立刻注意到此处必有蹊跷(<del>元芳你怎么看</del>)。树的轮廓非常细腻，而且和场景中的其他物件相比，树甚至没有出现有锯齿的边。

![tree_zoom01](/images/gamearttricks/tree_zoom01.jpg)

<!--more-->

这个效果叼的我难以置信。开发者实际上是在轻微弯曲的平面上直接画上去的(alpha8的透贴)。这个做法的缺点是，只能从某个特定角度看；但优点是看上去的效果会非常的好。暴雪在结合画面和游戏性上显然是大师级的(因为在ARPG里，相机的旋转并不是必须的)。

![diablo3](/images/gamearttricks/diablo3.gif)

(评论区里)Robert希望能得到更多的细节，但上图里分辨率实在太低了...[Roger](http://boerdijk.org/)提供了一个APP->OBJ格式转换器，这样我就能从MPQ压缩包(译注: 暴雪的自定义压缩包格式)里解压出暗黑三的模型，所以我做了一个更好的例子: 

![tree_rotation](/images/gamearttricks/tree_rotation.gif)

(译注: 这里可以看得很清楚，其实这个树就是一堆片儿，然后用了透贴生画上去的...)

Robert问了下为什么不用『真正的』三维模型来实现这个效果。我的回答是：这样当然可行，但是如果要做到一样的细腻，会消耗**非常多**的面片。譬如下面这个树枝：

![branch_wireframe_01](/images/gamearttricks/branch_wireframe_01.gif)

与其用一个几千面的模型，暴雪只用了两个三角形就搞定了。同时别忘了: 就算你用一个*有非常多面数的超级高模*来做，最后依然是渲染到一个平面上(frame buffer，或者考虑最后就是到你的屏幕上)。

如果我们忽略[Occulus Rift](http://www.oculusvr.com/)(或其他最后提供了真3D的技术)，同时只考虑相机视角(包括旋转、缩放)变化不大的情况下，只用2D的面片效果就完全足够了。当然这只是我的个人意见，如有异议还请指正。

下图是树的纹理贴图(左: diffuse，右: alpha)。讲真这个效果确实太帅了！

![tree_texture](/images/gamearttricks/tree_texture.jpg)

现在问题来了：为啥这个方法用的不是非常多? 我觉得主要问题在于你没权拍板... 你并不能只从美术的角度来看这个问题，特别是有些人<del>(译注: 大部分时候是程序)</del>满脑子想的是如何加入各种新的技术特性。『如果我们有的是一个3D引擎，我们就能旋转相机了！』如果这话是一个职位比你高的人说的，那么就算你说『无论从游戏性还是从美术角度来看，相机旋转实际上**并不是必须的**』，你的意见也会被很快无视... 

(译注: 卧槽我只想说这段话说的太正确了...即视感满满~讲真，游戏本身才是最重要的，并不是堆砌各种技术就能解决问题了)

对了，我非常推荐看一下这个视频[The Art of Diablo](http://gdcvault.com/play/1015306/The-Art-of-Diablo)，看一下暴雪是如何处理计算机图形学领域的~**特别是当你身边的人都只考虑如何用上DX99的新特性，完全忽视什么是游戏真正需要的时** (译注: 不一定是DX99，别忘了还有Vulkan和Metal，笑)
