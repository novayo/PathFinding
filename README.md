# PathFinding(完成)
###### tags: `Side Projects`

Project Link：https://novayo.github.io/PathFinding/

## 待開發
> Headers
    > Headers
>Table
    > TableHelper
    > TableUI?
- [x] init()
- [x] AddBomb()
- [x] RemoveBomb()
- [x] ClearBoard()
- [x] ClearWalls()
- [x] ClearPath()
- [x] Start(speed, indexlist)
    * 停止條件：在algorithm函數實現
- [x] 畫面風格統一
- [x] Code Review
    - [x] 教對方自己的部分
    - [x] 統一css的顏色變數
    - [x] 配色
    - [x] 加入Email
    - [x] 圖片去背
    - [x] 手機大小 登入的時候要調小
    - [x] [最短路徑演算法](/S-RwTqxuRU6GPzPVKRECYw)
    - [x] 整理轉向邏輯
        * > 為了動畫的流暢，所以在過彎處時，要維持上一個狀態，不能先轉彎，每個算法算出來的結果不一樣，有的需要位移算出來的結果
    - [x] [迷宮演算法 & 單數偶數牆壁設計邏輯](/Bt2dZXfuRo6AAYDtEvFzRQ)
    - [x] 程式架構

## 時程表
- [x] 2021/1/9 reactjs + bootstrap4 學習
- [x] 2021/1/17 加入演算法、maze動畫，以及修改部分內容
- [x] 2021/01/24 完成第一版
- [x] 2021/2/9 預定完成此專案

## 程式架構

### Backend 架構
![](https://i.imgur.com/XKCTPAv.png)

### Board 架構

![](https://i.imgur.com/cvz1VO3.png)


### Board 架構 (Old)

![](https://i.imgur.com/etSd7aK.jpg)


### Board變數
* table統一使用圖片(單一table)，目前暫時使用文字或顏色
* 使用
```htmlembedded=
<table> <tbody> <tr> <td>
```

### 共同變數
* bombStatus
* sysStatus
* 牆壁位置、起始位置、終點位置、bomb位置
* Algorithm
* Speed

### 起始變數值
* Speed: Average
* Algorithm: ""

### 變數命名方式
* variable : 開頭小寫 fourSumTwo
* function : 開頭大寫 AddFourTimes()
* 註解：function 都加上註解

### 資料夾固定名稱
* public
    * images: 放圖片位置
* src
    * components: 所有的components都放在這個資料夾
    * css: css file
    * core: 放HOC的位置，共同函數跟變數，檔案名稱：Core.js

## 討論
### 尚未解決

### 2021/02/08
* Code Review
    * 缺失
        * 後來有新增stop狀態，狀態的更改會很複雜，因此應該要想一個方法去handle狀態的改變，之後維護或是新增狀態會增加更多if
            * 是要按下button之後改變狀態，再去執行動畫之類的
            * 還是要按下button之後，執行動畫button自己改變狀態
            * 解決方案：？
    * 問題
        * Priority Que是不是舊pos的會留下而不更新
            * 只是因為舊的比較大所以會被往後排(no)
            * 因為有紀錄已走過的點，所以如果有更新已走過的位置的話，同一位置的不同大小值雖然都會在Priority Que內，但會選擇最小值來走，之後找尋重複點則會避開
        * NavButton call ClearPath(update 更新成 False) and start會造成Start所讀取的update是舊的update(並非ClearPath 更新後的值)
            * clear
            * ![](https://i.imgur.com/wvApa09.png)
        * 手機start button 動畫怪怪的

        * 用一維陣列來記錄table有什麼好處？
            * 無
        * 為何需要componentKind.add？
            * 因為weights的行為跟wall是一樣的
            * 因為weights是後來補上，所以用add來等於wall或weight的class字串
        * setTable 需要一個變數來控制要不要改變位置？
            * 像是跑動畫時，不需要更新其他位置，只需要改變css而已
            * 但若是要改變位置則可以用
            * 如此一來就可以用一個func去控制設定table
        * 為何weightmodal需要show？
            * 因為要讓動畫順滑，所以設定成讓show值+1，兩秒之後-1，等到show==0時，關閉modal
            * 但是 當達到最大值時，繼續+，但值不會變，所以useEffect失效，因此加入另外一個狀態為true or false，如果達到最大值就讓true false互換而達到useEffect有變化
            * 比較好的解法：讓useEffect抓show的值。
        * bfs or dfs按住w不能新增任何東西
            * 作法：
                * 如果目前狀態不能新增weight，讓componentKind.add = false
                * 判斷keydown keyup若componentKind.add = false則return
                ![](https://i.imgur.com/m7pnf44.png)
        * css 寫成繼承
* 按下dfs, bfs時，也要clear path，否則會有以下情況[連結](https://drive.google.com/file/d/1Lf-AnB1_I6PTu40ff40M3cidVCk4Lk1l/view?usp=sharing)
### 2021/01/24

#### 下次討論時間 2021/01/31
* 目標
    * 點visual要中斷，再點一次就繼續 (完成)
    * 最短路徑，改火焰顏色
    * 按加減的時候，不要先render，modal消失後再render (完成)
    * modal 圖片要修改成新增的
    * board size(手機適配) 
    * 偷算(weight 0~20 step=5) (不用)
    * 每過幾秒要再跑一次最短路徑 （不用）
    * 優化演算法（完成）
* 已完成
    * bfs dfs不能加上weight（之類的要調整）(完成)
    * 速度調整
        * fast 真的很快 (完成)
        * average 可以用眼睛去追，也不會太慢 (完成)
        * slow 不用改 (完成)
    * start end bomb 背景最短路徑要黃色且要有動畫 (完成)
    * 加上weight的提示和動畫，weight可以調整 (完成)
    * random maze & weight (完成)
    * 剩下的三個演算法（完成）
    * Kruskal，Prim，Eller （完成）
    * 配色討論，圖片修改（完成）
    * maze 速度 要吃speed變數（完成）
    * A* 跟 Greedy 找法待討論（完成）
    * 連結weights（完成）
### 2021/01/17
#### 下次討論時間 2021/01/24
* 目標：
    * 阿寶
        * bfs dfs不能加上weight（之類的要調整）(完成)
        * 速度調整
            * fast 真的很快 (完成)
            * average 可以用眼睛去追，也不會太慢 (完成)
            * slow 不用改 (完成)
        * start end bomb 背景最短路徑要黃色且要有動畫 (完成)
        * 加上weight的提示和動畫，weight可以調整 (完成)
        * random maze & weight (完成)
        * board size(手機適配)（2021/01/24）

    * 施崇祐
        * 剩下的三個演算法（完成）
        * Kruskal，Prim，Eller （完成）
        * 配色討論，圖片修改（完成）
        * maze 速度 要吃speed變數（完成）
        * modal 圖片要修改成新增的 （2021/01/24）
        * A* 跟 Greedy 找法待討論（完成）
        * 連結weights（完成）
* 之後的Code Review
    * 統一css的顏色變數
    * 配色
    * 加入Email
    * 圖片去背
* 已完成
    * 開始畫面
    * bomb search後的顏色
        * info也要提示
    * start end圖示變更 (weighted 狀態加入core)
        * 依照狀態改變圖案
        * info列表也要更改
    * weighted node 圖案（起始圖案也要提供）
    * weighted maze 畫了，但按下非weighted演算法時，要清空table
    * clear wall&weight 要清空weight
    * weight不能移動，也不能增加，可以可以清除 (理解錯誤，按下w可以增加)

### 2021/01/08
#### 2021/01/17
1. 目標：
    * 讓演算法及maze功能實現
2. 分工
> [name=施崇祐]
* 寫出BFS丟給阿寶
    * 如果bomb存在，不存在
* 寫出basic random maze
    * 要保證活路
* 寫出basic random weight

> [name=鄭琮寶]
* maze animation
* 即時更新結果
* board size動態修正
* search到start和end要注意
* start end 可能會有從兩邊同時 search 的情況，因此start function要做修改

#### 待做
* 開始畫面
* bomb search後的顏色
    * info也要提示
* start end圖示變更 (weighted 狀態加入core)
    * 依照狀態改變圖案
    * info列表也要更改
* weighted node 圖案（起始圖案也要提供）
* weighted maze 畫了，但按下非weighted演算法時，要清空table
* clear wall&weight 要清空weight
* weight不能移動，也不能增加，可以可以清除


### 2021/01/05
* start改成在函數改變系統狀態，add bomb, clear board也改成在函數中改變狀態
* Eric
    * 先加載完後顯示畫面，為了練習spinner，假設有ajax在後端抓資料，抓1秒之後再讓棋盤顯示出來
    * start完之後，callback改變系統狀態 （start函數去改變）

### 2021/01/03
* bugs:
    * start end 重疊後，start會跟著滑鼠移動問題
        * 原因：因為mouseUp會抓取當前的物件id，而不是目前要移動的id，所以用if去判斷e.target.id會有問題
        * 解法：<看阿寶怎麼解>
    * 解決：add bomb, start非同步問題
* table大小取得：給<table一個id，去取得這個id目前的大小
* start end bomb，不能重疊，且移動超過目標時一樣要改變
    * 解法：<看阿寶怎麼解>
        * 已解決
* cheng
    * systatus
    * bomb status (Addbomb clearBoard)
    * board padding

* Eric
    * 改變nav bar風格
    * 先加載完後顯示畫面(完成)
    * start完之後，callback改變系統狀態 （start函數去改變）
    * 加上nav bar以外的物件進去


### 2020/12/27
* bugs: 
    * findDOMNode is deprecated in StrictMode.
        * 解決：因為StrictMode的關係，不會影響到正式環境，所以可以無視
    * index.js:1 Warning: render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render.
* 修bugs:
    * 左上角logo顯示異常
    * 棋盤置中
* Algorithm流程
    > 選擇演算法之後，更新演算法共同變數，按下開始，執行startProcess
    > startProcess內，去抓取牆壁、起始位置、終點位置、bomb位置、目前演算法是什麼，去執行演算法
    > 執行完成之後，回傳index_list，再丟給table_visualizer(index_list)
* 共同變數
    * bombStatus
    * sysStatus
    * 牆壁位置、起始位置、終點位置、bomb位置
* [sass](https://sass-lang.com/documentation/at-rules/control/if)使用與否再討論

### 2020/12/22
* 問題
    * 每一次改變都要重新render整個棋盤

* [onmouseup無反應](https://stackoverflow.com/questions/9506041/events-mouseup-not-firing-after-mousemove)
* 用圖層解決變換picture變換的問題
* 整合code，建立github

### 2020/12/20
* 問題
    * table統一使用圖片(單一table)，目前暫時使用文字或顏色
        * 已解決
    


### 2020/12/19
* 問題
    * Lession 53~54 useEffect "empty dependence array" 不是很明白他的意思，只知道list內值代表若與preProps相等時，不呼叫useEffect
        * 已解決
    * Related state transitions我聽到的是如果數據有關聯的話，這樣也會比較code清楚
        * 正確
    * 確認一下const incrementTwo = () => {return {...}} // incrementTwo式value還是function，我的理解是將參數"()"傳入的function
        * 正確
    * Lession 69的useCallback要不要來討論一下？
        * 是不是應該useCallback不用參考變數比較好？因為button不用再rerender呀
        * ![](https://i.imgur.com/VKXq9GF.png)
        * 阿寶覺得我的想法正確與否：是
    * 最後的cutomerHook你是怎麼看待的？
        * 不就是建立function？同意
* 要不要統一用 hook 就好？
    * 同意
* code review時，來看是否有不必要的render，並將其解決？
    * 同意
* default
    * 速度為 Average
    * 演算法為 第一個
* 下方棋盤已經建立，現在縮小視窗，那棋盤排列會變要怎麼辦？
    * 12x12 => 6x24
    * 解法：就跟著縮小

### 2020/12/13
* https://www.youtube.com/watch?v=8aCXVC9Qmto&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=29
* bootstrap4 or react bootstrap
    * 統一用: [react bootstrap](https://react-bootstrap.github.io/components/cards/)

### 2020/12/12
- [name=施崇祐]
* - [x] 檔案架構
    - [x] 前端後端 -> react(只能寫前端) 內 加入後端(axios.get())
        * react(html) + express(router) => nodejs => js的套件(express)
        * 主要難點：react要怎麼跟express做互動？
    - [x] 圖片資料夾 固定名稱
    - [x] 用namespace? (我不知道怎麼用) : 不用
* - [x] 變數命名方式
* - [x] 全部使用hook? 不使用class? ： 等阿寶看完再討論
    * class component(比較肥，代價比較大) vs function component(之後的更新，hook => 可以在FC中使用)
    * state
    * componentDidMount vs componentDidUpdate
    * context
    * reducer

### 2020/12/05
#### 大致功能
1. 起始點 終點 可以移動
2. 點擊加上障礙物
3. 選擇演算法
4. navigation bar
    * Home button
    * 下拉式選單
    * 產生迷宮
    * add bomb
    * restart
    * clear board
    * clear path
    * speed
5. 圖示
6. 可以按的區塊
    * 起始點
    * 終點
    * 牆壁
        * 按兩次 取消
        * 按著可以 連續製造牆壁
    * bomb
    * 起始點 尋找的顏色
    * bomb 尋找的顏色
    * 結果路徑
7. Start button
8. 說明

#### 詳細功能
演算法
* 參數：起始 終點 bomb 牆壁（障礙物）
* 回傳：每一個搜尋點的位置（list, index=時間）
* 回傳：答案那條
* 邊界條件：
* 終止條件：

拖拉 起點終點bomb 不能重疊
牆壁 不能重疊

#### 分工

reactjs + bootstrap4


## 學習資源
* [Youtube 影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3)
* [Eric React學習筆記](https://hackmd.io/@novayo/Hk4Qn0m4w)

## 進度報告
### 鄭琮寶

* 1/28
    * 討論
        * speed
            * 已完成
        * isMaze reducer
            * 已完成
        * weight default
            * 已完成

* 1/27
    * mobile support
        * 判斷是否為android或ios，調整大小

* 1/26
    * 點visual要中斷，再點一次就繼續
        * "Maze Support"

* 1/25
    * 點visual要中斷，再點一次就繼續
        * 加上"STOP" status
        * NAV的狀態以及color

* 1/24
    * 按加減的時候，不要先render，modal消失後再render

* 1/22
    * 確保start end position奇數
    * 調整速度大小
    * 將maze output改成[walls, weight]
    * 記得等可以修改CSS以後要刪除start end bomb static
        * 未刪除 !!!

* 1/21
    * 加入random maze wall和weight的兩個alg
    * 整理CSS顏色變數
    * 適時的禁只加入weight
        * bfs dfs不能加上weight

* 1/20
    * 加入weight的modal(用+-調整weight大小並顯示)

* 1/19
    * 重大更新
        * 全面剔除className判斷物件，改成利用位置判斷物件
        * 全面剔除style的方法改成利用CSS(className)修改任何特效

* 1/18
    * start end bomb weight在search的時候的動畫
    * 利用style修改靜態時的背景顏色(動畫執行完後拖動,start end bomb)



* 1/15
    * ![](https://i.imgur.com/bDQxg7l.png)
        * 怪怪的(解決)
    * ![](https://i.imgur.com/H4w5i9N.png)
        * 查證中(解決)
    * 加入start end bomb 動畫
    * path 動畫時head會有 PathHead.png
    * start start bug 暫時修復
    * ClearWall改成包含ClearPath


* 1/14
    * 加入weight

* 1/13
    * 將start end bomb改成圖片
        * 可將圖片改成去背png
    * bomb search bug (紫色不消失)
        * 已修復

* 1/9
    * 加上動畫和即時更新board
    * 不確定是不是bug
        * ![](https://i.imgur.com/Fb3YurT.png)
        * 已解決


* 1/8
    * 已加入start end bomb wall的position 在 index.js wall是用"hash"的形式
    * maze的wall應該是Alg要存在index.js??
        * 討論
* 1/5
    * 加入CSS 動畫
        * 問題無法加入td background-image
            * 待解決
        * 利用document.getElementById().bgrcolor改成.className利用className改變CSS
    * Addbomb bug當加入bomb的位置有start end不顯示 但NavBar會變成Remove Bomb
        * 可改成顯示在旁邊（直接不顯示）
* 1/4
    * 將原本的onmouseout和onmouseenter實現start end bomb移動 改成利用id 
    * 加入start()的Animation
        * 待解決 callback (search -> path)
    * 加入ClearPath()
    * useState需共用
        * 將useState改成useReducer
    * 無法rerender table
        * 利用document.getElementById()去render
        * 刪除利用table紀錄顏色的
* 12/25
    * AddBomb()    finish 
    * RemoveBomb() finish 
    * ClearBoard() finish 
    * ClearWalls() finish 
    * 按鈕用function的方式support
    * 按第一下AddBomb有bug
        * 已解決
* 12/22
    * 利用map建立td tr的table
    * 利用onmousedown onmouseup onmouseout onmouseenter製作table的event
* 12/17
    * 看完[教學影片]


### 施崇祐
* 1/28
    * 介面適配手機
    * 發現bug
        * [bug1](https://drive.google.com/file/d/1TVXowvOTy4KO1uGQwOmulxmn0i9C0Qg1/view?usp=sharing)
        * [bug2](https://drive.google.com/file/d/1MEMhos7rlPQJNMVJxl67jRqIx72MZQMR/view?usp=sharing)
        * [bug3](https://drive.google.com/file/d/1HddDkYZ8J5qnwPK0FWum3h4Lb3gNrtjr/view?usp=sharing)
    * 修改最短路徑css
* 1/26
    * 優化Dijkstra，並保留舊版本
        * [優化前後比較](https://drive.google.com/file/d/1rXzTXJauz9CCu6jGYbgXgwhDJkrnrHjR/view?usp=sharing)
            * 優化前：20秒 (n^2)
            * 優化後：<1秒 (nlogn)
* 1/24
    * 解決 演算法回傳方向資訊 錯誤
        * 轉彎方向改為上一個點的方向（看起來更順暢）
    * 加入Email button
* 1/23
    * 適配畫面調整
    * 演算法回傳方向資訊
    * 畫面優化
    * 連結weights共同變數
    * 精簡maze find程式碼
    * 去除bugs
        * recursive division 可能還是會有死路 
            * ![](https://i.imgur.com/r6gYt39.png)
        * dfs 不應該要找到真正的最短路徑，不能用distance去計算最短路徑，而是要用bottom up 回來的路徑來紀錄最短路徑
* 1/22
    * 加入krusal's maze, Prim, Eller Maze
    * 請阿寶調整最小棋盤為5*5
    * 發現bug，已通知阿寶:
        * [影片](https://www.facebook.com/messenger_media/?thread_id=100002218680907&attachment_id=2008578285960357&message_id=mid.%24cAAAABiTJyNt9W4j-s13KkOHx4dGW)
* 1/21
    * 發現bug: recursive division 如果切到start，因為不是活路，所以可能會在start周圍都加上牆壁，就變成死路了
    * 完成 bidirecionSwarm
    * 修改 dijkstra BUG
        * 走過的點應該也要更新table，但不要再跑過一次
    * [顏色調整筆記](https://hackmd.io/ZiucapD5RJCtfJS4xj7I5A)
* 1/19
    * 修改 A* 跟 Greedy 策略
        * [A*策略筆記](https://hackmd.io/@novayo/H1ffEfm1d)
    * 加入Swarm & Convergent Swarm
    * 發現bugs - 已通知阿寶
        * 選到 BFS DFS 
            * 起始點圖片要改變
            * 不能加weight node
* 1/18
    * 修DFS Dijkstra bugs
        * 若第一次沒找到不用找bomb search
* 1/17
    * [加入Recursive Division Maze](http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm) (此方法不會保證活路，但我的改良有保證活路)
        * 演算法: divide-and-conquer的概念
            1. 抉擇要切垂直或水平（可以用長跟寬去決定，把長的那邊切短），==若要切水平==
            2. 隨機選擇要開哪個洞（隨機0~width的一個位置）
            3. 建立整條水平的牆壁，除了開洞的那個位置（這樣就有一個活路了）
            4. 去遞迴上面與下面
        * 有保證沒死路
            > DoRecursiveDivision(x, y, width, height, walls)
            > x, y為為起始位置，代表X=x的那橫條、X=height的那橫條、Y=y的那直條、Y=width的那直條都是牆壁
            > 
            > x, y, width, height均會包含 牆壁，要生成的範圍會在這個牆壁內
            > 為了保證道路暢通 且 四周圍要都是牆壁，因此已經設計成棋盤長寬均為奇數，width, height也必為為奇數
            > 所以x, y必為偶數也就是牆壁必為偶數，則道路必為奇數
            > 因此 就能保證沒有死路，因為選擇牆壁的話（偶數），絕對不會擋到路（奇數）
    `我觀察目標的跑法推估的，不確定正不正確`
    * 加入Recursive Division Maze (vertical skew)
        * 與正常版的差別在於，選擇切水平或是垂直的條件不同
        * 演算法改動：
            * 第4步：第一個遞迴規定跑垂直，第二個跑水平
    * 加入Recursive Division Maze (horizontal skew)
        * 與正常版的差別在於，選擇切水平或是垂直的條件不同
        * 演算法改動：
            * 第4步：第一個遞迴規定跑水平，第二個跑垂直
    * A* 筆記 - [影片連結](https://www.youtube.com/watch/ySN5Wnu88nE)
        * 跟dijkstra很像，所以目標一樣要建立最短路徑table，但是多了一個heuristic的推估（這個是自己建的）
        * [geeksforgeeks評語](https://www.geeksforgeeks.org/a-search-algorithm/)：
        > Informally speaking, A* Search algorithms, unlike other traversal techniques, it has “brains”. What it means is that it is really a smart algorithm which separates it from the other conventional algorithms. 
        * 與dijkstra的比較
            * dijkstra
                * greedy，只看目前最小權重
                * 缺點：目標在右邊，但目前左邊最小，那整個搜尋會往左邊，就會找很多不必要的點。
            * a*
                * [greedy](https://en.wikipedia.org/wiki/Greedy_algorithm#:~:text=Dijkstra's%20algorithm%20and%20the%20related,will%20not%20overestimate%20path%20costs.)，但看目前最小"權重＋heuristic數字"
                * 優點：推測陣列可以自己設定，就可以依照每個專案不同去訂不同的策略
                * 解說：![](https://i.imgur.com/Um1dBew.jpg)

* 1/16
    * 加入 dijkstra
    * 已通知阿寶 
        * 棋盤要加入權重大小，可以的話做出一個與使用者互動的設定權重大小的東西，來保證演算法在權重大的時候是對的
        * 速度應做調整
            * slow的時候一格一格顯示
            * 其他速度應要固定幾秒鐘完成
                * 因為每個演算法的搜尋長度都不同，bfs會一層多個，但dfs跟dijkstra都是一個一層，所以要改成不管多長都應該要固定幾秒顯示完成
* 1/15
    * 修改dfs 顯示錯誤最短路徑
* 1/14
    * 完成 [binary tree maze](https://hurna.io/academy/algorithms/maze_generator/binary.html)
        * 只有兩種方向可以建立，上左、下右，而且不能把邊佔滿，上左就一定要留最下及最右邊整條為空，因為這樣才符合binary tree(此為我的例子)
        * 演算法
        ```python=
        # (-2是為了最右及最下不要跑到，留出空位，以符合binary tree)
        for x in range(2, height-2, 2):
            for y in range(2, width-2, 2):
                dir = []
                if ([x-2, y] is 牆壁): dir.append([x-2, y]) // 若上面是牆壁，才要考慮連接起來
                if ([x, y-2] is 牆壁): dir.append([x, y-2]) // 若左邊是牆壁，才要考慮連接起來
                
                if len(dir) == 0: continue
                
                wall.append([x, y]) // 加入自己
                wall.append(random(dir)) // 隨機選一個加入上或左
        ```
        * 優點
            * 為perfect maze，一定有活路
            * 不用用額外變數去儲存當前狀態
        * 缺點
            * 會留一整行跟列為空，maze難度下降
        * Maze Algorithm分成兩大類
            1. 找路徑: 
                * [Recursive Backtracking](http://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking)
                * [Eller's Algorithm](http://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm)
                * [Kruskal's Algorithm](http://weblog.jamisbuck.org/2011/1/3/maze-generation-kruskal-s-algorithm)
                * [Prim's Algorithm](http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm)
            2. 建立牆壁: 
                * [Recursive Division](http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm)
                * [binary tree maze](https://hurna.io/academy/algorithms/maze_generator/binary.html)
* 1/13
    * 完成modal
    * 完成dfs
    * 發現bugs
        * 第二次以後執行須按兩次按鈕（應該是start的update.get再搞鬼，已通知阿寶修）
* 1/12
    * 換Logo
    * modal
        * 變換語言
        * 整合程式
        * 固定大小
        * 按到底之後會關閉modal
    * bfs接上bomb search
    * 修改執行速度
    * bug
        * bomb search 紫色無法消除（已解決）
        * start按鈕要按兩次才會有作用
* 1/10
    * 加入modal
    * 加入simple 
    * 加入Simple Stair Pattern
* 1/9
    * 加入bfs search（包含bomb），shortest path
    * bugs: 重複執行兩次 起點與中點會消失
* 1/8
    * 討論
    * 修bugs
* 1/6
    * 修add bomb bugs: 
        * start或end在bomb會出現的位置，add bomb不應該按下去
    * 加入兩個component
    * 改字體
* 1/5
    * 加入loading
    * 修bugs
* 12/28
    * 新增功能：按下Clear Board，改變Bomb Context後，Add Bomb狀態會自己改變
    * 發現2 bugs
        * 先按棋盤，再按add bomb ，按過的棋盤的重置(反正第一次按下add bomb都會刷新整個棋盤)
        * 按下執行之後，不應該能點擊棋盤
* 12/27
    * 設定running idle共同變數
    * running時不能做其他事情
    * button text會改變
    * 初始值設定
* 12/25
    * 整合table按鈕
* 12/18
    * 未加: button在執行過程中，應該不能再被按
    * 建立好基本nav-bar
        * Dropdown:
            * 選擇後可以使用函數
        * button: 
            * 選擇後可以使用函數
            * 可以知道目前選擇的演算法是哪個而改變button顏色及文字
            * 1秒鐘之後會回復原狀
    * handle畫面大小的問題

* 12/13 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 66~77集 (完成)
* 12/12 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 61~65集
* 12/11 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 41~60集
* 12/10 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 33~40集
* 12/7 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 23~32集
* 12/6 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 15~22集
* 12/5 [教學影片](https://www.youtube.com/watch?v=uirRaVjRsf4&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=11) 1~14集

## 未來規劃
1. 執行完畢之後，起始終點一樣可以拉動
2. 找到路徑之後，跑一次結果路徑
3. 最短路徑的黃色不應該有格子線
4. Code Review
    * 加入 演算法接python而不是react
    * express => 防呆 => http://localhost:5000/如果這裡亂打，那要倒回root，主要練習react如何跟後端互動！
    * 追[code](https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial)看他的框架
5. 棋盤 方格 動畫
6. 不要找尋不必要的路或重複的路

## Reference
1. [原影片](https://www.youtube.com/watch?v=n4t_-NjY_Sg)
2. [架構圖](https://app.diagrams.net/#G1ZLHxsq6sbfuxETyfznjmnUTIrbVHGIsS)
3. [取得public 資料夾路徑](https://create-react-app.dev/docs/using-the-public-folder/)
4. [JS CSS 教學](https://www.w3schools.com/)
5. [顏色調配](https://hackmd.io/@novayo/B1J1Yor1u)





## 之後解決
* 每一次改變都要重新render整個棋盤
* Lession 70不能這樣寫(不過好像知道你寫的 =>
        * 使用時機
        useCallback: 要丟到props的，就用callback
        useMemo: 自己用的函數，就用Memo
        即可)
        * 為何下面例子寫useCallback沒有預期效果
        ```javascript=
        import React, {useState, useMemo, useCallback} from 'react'

        function Counter() {
            const [counterOne, setCounterOne] = useState(0)
            const [counterTwo, setCounterTwo] = useState(0)

            const incrementOne = () => {
                setCounterOne(counterOne + 1)
            }
            const incrementTwo = () => {
                setCounterTwo(counterTwo + 1)
            }
            const isEven = useCallback(() => {
                let i = 0
                while(i < 2000000000) i++
                return counterOne % 2 == 0
            }, [counterOne])

            return (
                <div>
                    <div>
                        <button onClick = {incrementOne}>Count one - {counterOne}</button>
                        <span>{isEven() ? "Even" : "Odd"}</span> 
                    </div>
                    <div>
                        <button onClick = {incrementTwo}>Count two - {counterTwo}</button>
                    </div>
                </div>
            )
        }

        export default Counter
        ```
* ![](https://i.imgur.com/sRji4tW.png)