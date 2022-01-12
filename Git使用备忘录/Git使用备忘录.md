# Git使用备忘录

官网：https://git-scm.com/

## 定义

分布式版本控制工具

## Git四个工作区域

- 工作区(Working Directory)：就是你平时存放项目代码的地方
- 暂存区(Stage/Index)：用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息
- 资源库(Repository或Git Directory)、本地仓库：安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本
- git仓库(Remote Directory)、远程仓库：托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换

![Git四个工作区域](.\4个工作区.png)

## GIT文件的五种状态

- 未追踪文件（Untracked）：此文件在工作区中, 但并没有加入到git仓库, 不参与版本控制. 通过git add 状态变为Staged
- 未修改（Unmodify）：文件已经入库, 未修改, 即版本库中的文件快照内容与工作区中完全一致. 这种类型的文件有两种去处, 如果它被修改, 则变为Modified,如果使用git rm移出版本库, 则成为Untracked文件
- 已修改（modified）：文件已修改, 仅仅是修改, 并没有进行其他的操作. 这个文件也有两个去处, 通过git add可进入暂存staged状态, 使用git checkout 则丢弃修改,返回到unmodify状态
- 已暂存（staged）：暂存状态. 执行git commit则将修改同步到git仓库中, 这时库中的文件和工作区文件变为一致, 文件为Unmodify状态. 执行git reset HEAD [filename]取消暂存,文件状态为Modified
- 已提交（committed）：已提交状态，执行git reset可以变为暂存状态，执行git push可以把本地仓库文件推送到远程仓库

![GIT文件的五种状态](.\5个文件状态.png)

## Git的工作流程

1. 在工作目录中添加、修改文件
2. 将需要进行版本管理的文件放入暂存区域
3. 将暂存区域的文件提交到git仓库
4. 将本地仓库的代码推送到远程仓库

Git推荐的工作规范流程：[https://www.ruanyifeng.com/blog/2015/08/git-use-process.html](https://www.ruanyifeng.com/blog/2015/08/git-use-process.html)

## Git常用命令

- git config
  
    ```bash
    # 显示当前的Git配置
    git config --list
    
    # 编辑Git配置文件
    git config -e [--global]
    
    # 初次commit之前，需要配置用户邮箱及用户名
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    ```
    
- git init
  
    ```bash
    # 在当前工作目录初始化git仓库
    git init
    
    # 新建一个目录，将其初始化为Git仓库
    git init [project-name]
    ```
    
- git status
  
    ```bash
    # 查看所有文件状态
    git status
    
    # 查看指定文件的状态
    git status [filename]
    ```
    
- git log
  
    ```bash
    # 查看提交记录
    git log
    
    # 通过一行展示提交信息
    git log --oneline
    ```
    
- git add：工作区文件 → 暂存区
  
    ```bash
    # 添加指定文件到暂存区
    git add [file1] [file2] ... 
    
    # 添加指定的目录到暂存区，包括子目录
    git add [dir]
    
    # 添加当前目录的所有文件到暂存区
    git add .
    ```
    
- git rm
  
    ```bash
    # 从全部区域删除，删除暂存区或分支上、工作区的文件，会添加一个提交记录
    git rm [filename]
    
    # 从暂存区删除，删除暂存区或分支上的文件, 回到工作区
    git rm --cached [filename]
    ```
    
- git commit： 暂存区 → 本地仓库
  
    ```bash
    # 将暂存区的资源提交到本地仓库
    git commit -m "该提交说明"
    
    # 将工作区，暂时区的所有资源提交到本地仓库，文件无需执行git add
    git commit -am "该提交的说明"
    ```
    
- git reset
  
    ```bash
    # 移除不必要的添加到暂存区的文件
    git reset HEAD [filename]
    
    # 去掉上一次的提交（会直接变成add之前状态）
    git reset HEAD^
    
    # 去掉上一次的提交（变成add之后，commit之前状态）
    git reset --soft  HEAD^
    
    # 将仓库文件回退至目标版本，改动文件放于暂存区
    git reset --soft <commit hash>
    
    # 将全部区域回退到目标版本,不含远程文件
    git reset --hard <commit hash>
    
    # 将仓库文件回退至目标版本，改动文件放于工作区，--mixed可省略
    git reset --mixed <commit hash>
    ```
    
- git branch：查看分支，分支相当于当前项目的备份，分支与分支之间独立
  
    ```bash
    # 新建分支
    git branch <branch name>
    
    # 删除分支，无法删除未合并分支
    git branch -d <branch name>
    
    # 强制删除分支
    git branch -D <branch name>
    
    # 建立本地分支和远程分支的关联,当git pull提示“no tracking information”
    git branch --set-upstream <branch name> <origin/branch name>
    ```
    
- git checkout
  
    ```bash
    # 切换分支
    git checkout <branch name>
    
    # 创建分支并切换到新分支
    git checkout -b <branch name>
    ```
    
- git diff：查看差异
  
    ```bash
    git diff <branch name> 查看本地分支和对应分支的差异
    ```
    
- git merge：合并分支
  
    ```bash
    # 指定分支合并到当前分支
    git merge <branch name>
    
    # 冲突的标志,如遇到冲突，解决冲突再重add,commit
    <<<<<<< 当前分支代码
    ...
    =======
    ...
    >>>>>>> 被合并分支代码
    ```
    
- git clone
  
    ```bash
    # 下载一个项目和它的整个代码历史
    git clone [url]
    ```
    
- git remote：关联远程仓库
  
    ```bash
    # 添加仓库关联信息
    git remote add <repo name> <repo url>
    
    # 查看远程仓库信息
    git remote -v
    ```
    
- git push：将仓库文件推送至远程仓库
  
    ```bash
    # 把本地分支推送的远程分支，在远程新建一个同步分支，初次推送执行
    git push --set-upstream origin <branch name>
    
    # 将仓库文件推送至远程仓库，第一次执行上面的操作，后续只需执行此操作即可
    git push
    ```
    
- git pull：将远程仓库文件拉取至本地仓库（工作区）
  
    ```bash
    # 拉取远程仓库分文件至本地，等于git fetch + git merge
    git pull
    ```
    
- git revert：撒消某次执行
  
    ```bash
    # 撤消指定提交 会添加一个revert提交记录
    git revert <commit hash>
    ```
    
- git cherry-pick：指定的提交应用于当前分支，在当前分支产生一个新的提交，哈希值会不一样。
  
    ```bash
    # 指定的提交（commit）应用于当前所在分支
    git cherry-pick <commit hash>
    
    # 分支的最近一次提交，转移到当前分支
    git cherry-pick <branch name>
    
    # 转移二个提交之间的所有提交到当前分支
    git cherry-pick <commit hash>..<commit hash>
    
    # 转移二个提交之间的所有提交到当前分支,不包含第一个提交
    git cherry-pick <commit hash>^..<commit hash>
    
    # 如果操作过程中发生代码冲突，先解决冲突到执行按如下操作继续完成cherry-pick操作
    git add .
    git cherry-pick --continue
    
    # 发生代码冲突后，放弃合并，回到操作前的样子
    git cherry-pick --abort
    
    # 发生代码冲突后，退出cherry pick，但是不回到操作前的样子
    git cherry-pick --quit
    ```
    
    cherry pick参考链接：[http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
    
- git rebase：中文名变基，提取我们在当前分支上的改动到指定分支上
  
    ```bash
    # 主要用于分支合并，可以让merge操作变得顺滑，善用git rebase可以让我们的提交历史变得更加优雅，也可以实现一些比较棘手的功能
    # 当前分支的提交应用到指定分支
    git rebase <branch name>
    
    # 交互模式执行rebase，可自定义rebase行为
    git rebase -i <branch name>
    # 可针对不同提交执行如下命令操作
    # pick：保留该commit（缩写:p）
    # reword：保留该commit，但我需要修改该commit的注释（缩写:r）
    # edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
    # squash：将该commit和前一个commit合并（缩写:s）
    # fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
    # exec：执行shell命令（缩写:x）
    # drop：我要丢弃该commit（缩写:d
    
    # 发生代码冲后，解决冲突后按事下操作继续完成rebaser操作
    git add .
    git rebase --continue
    
    # 终止rebase的行动，并且分支都回到rebase开始前的状态
    git rebase --abort
    ```
    
    上面命令中rebase是最难懂的，知乎文章：[https://zhuanlan.zhihu.com/p/271677627](https://zhuanlan.zhihu.com/p/271677627)
    
- git tag 给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ `v1.0` 、 `v2.0` 等等）
  
    ```bash
    # 打标签
    git tag
    # 只查看1.8.5系列的标签
    git tag -l "v1.8.5*"
    # 打标签
    git tag <tagname>
    # 附注标签
    git tag -a <tagname> -m "注释信息"
    # 基于过去的某一个提交打标签
    git tag -a <tagname> <commitid>
    # 推送标签到远程
    	# 指定标签
    git push origin <tagname>
    	# 所有标签一次推送远程
    git push origin --tags
    # 删除标签
    	# 删除本地的
    git tag -d <tagname>
    	# 删除远程标签
    git push origin --delete <tagname>
    # 基于标签检索出新分支
    git checkout -b <branch> <tagname>
    ```
    

阮一峰整理的git常用命令清单：[https://www.bookstack.cn/books/git-command](https://www.bookstack.cn/books/git-command)

## .gitignore文件

让git忽略某些文件提交，如node_modules、.ideat等，被过滤掉的文件不会出现在git仓库中（gitlab或github），本地工作区中还有，只是push的时候不会上传

参考说明示例：

```bash
#               表示此为注释,将被Git忽略
config.php     # 表示忽略当前路径的config.php 文件
*.log          # 表示忽略所有.log 文件
/TODO           # 表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/          # 表示忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       # 表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
bin/           # 表示忽略当前路径下的bin文件夹和文件夹下的所有内容，不忽略 bin 文件
/bin           # 表示忽略根目录下的bin文件
/*.c           # 表示忽略cat.c，不忽略 build/cat.c
**/foo         # 表示忽略/foo,a/foo,a/b/foo等
a/**/b         # 表示忽略a/b, a/x/b,a/x/y/b等
/mtk/           # 表示过滤根目录下整个文件夹
/mtk/do.c       # 表示过滤某个具体文件
!lib.a          # 表示但lib.a除外
!/bin/run.sh    # 表示不忽略bin目录下的run.sh文件
 
# 想象一个场景：假如我们只需要管理/mtk/目录中的one.txt文件，这个目录中的其他文件都不需要管理，那么规则应如下，注意/mtk/*不能写为/mtk/，否则父目录被前面的规则排除掉了，one.txt文件虽然加了!过滤规则，也不会生效
/mtk/*
!/mtk/one.txt

# 忽略目录 fd1 下的全部内容，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略
fd1/*

# 忽略根目录下的 /fd1/ 目录的全部内容
/fd1/*
 
# 忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录，要先对bin/的父目录使用!规则，使其不被排除
/*
!.gitignore
!/fw/ 
/fw/*
!/fw/bin/
!/fw/sf/
```

.gitignore配置参考链接：[https://www.cnblogs.com/kevingrace/p/5690241.html](https://www.cnblogs.com/kevingrace/p/5690241.html)

## 学习教程推荐

廖雪峰版：[https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648](https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648)

阮一峰版：[https://www.bookstack.cn/books/git-by-liaoxuefeng](https://www.bookstack.cn/books/git-by-liaoxuefeng)

Git Community Book 中文版：[http://gitbook.liuhui998.com/index.html](http://gitbook.liuhui998.com/index.html)

## GIT GUI**客户端工具**

在平时开发中，并不是每个人都能记住git的这么多命令，也并不是每个人都习惯用命令行工具做GIT提交，推荐二款好用的git gui工具：

TortoiseGit：[https://tortoisegit.org/download/](https://tortoisegit.org/download/) 只有window平台

Sourcetree：[https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)  支持mac和window

Visual Studio Code和WebStorm都自带git gui，选择你用的合手的工具提交你的git使用体验吧