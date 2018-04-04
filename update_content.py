import os
import os.path
import collections

head = '''
	<head>
		<meta http-equiv="X-UA-Compatible">
		<meta http-equiv="content-type" content="text/html;charset=utf8" />
		<title>Save Truth</title>
                <style>
                    body, html {
                        width: 100%;
                        height: 100%;
                    }
                    .left {
                        float: left;
                        width: 400px;
                        height: auto;
                        background-color: green;
                    }
                    .right {
                        background-color: orange;
                        margin-left: 410px;
                        height: auto;
                        background-color: lightgreen;
                        padding-top: 10%;
                        padding-left: 20px;
                    }
                </style>
	</head>
'''

abstract = '''
		<div class="left">
		<h2>savetruth</h2> 

		也许有一天我们心中的梦想能够实现<br />也许期待的“职业化”也会降临<br />也许我们仍然是我们<br />营区大院依然是现在的营区大院<br />里面还回荡着相同的歌谣。<br />
		<br />
		我们也许算不上历史长河中的一粒沙<br />也算不上汪洋大海中的一滴水 <br />我们终会被遗忘<br />就像我们那被狗吃了的青春一样<br />
		骨头渣滓都不会留下。<br />
		<br />
		但是我们奋斗过！<br />不管成功失败，我们勇敢过，尝试过，努力过！<br />如果某一天阳光照进了这片黑暗森林<br />那么撕开这道缝隙的力量必然有我们的一份。<br />
		谁都能将我们遗忘，将我们弃如敝履，但是我们不能！<br />
		<br />
		<strong>SaveTruth，save的是真实，也是我们那无处安放的青春！</strong><br />

                <hr />
                <a href="mailto:1036014410@qq.com">我的邮箱</a>
		</div>
'''
#当前目录
PWD = './'

def getTag(title, address) :
    '''根据title和address输出相应的HTML标签。
        title是要显示的文章标题
        address是相应的页面或文档地址
    '''
    return '<p><a href="{add}">{title}</a></p>'.format(add = address,title = title)

def extract() :
    '''在当前目录下提取文章信息。'''
    #当面目录PWD经遍历后得到的所有子文件夹和文件的对应信息
    allInfo = collections.OrderedDict() 
    #not display
    notDisplay = set(['README.md','index.html'])
    allInfo[PWD] = []
    for f in os.listdir(PWD) :
        sub = os.path.join(PWD,f)
        if f != '.git' and os.path.isdir(sub) :
            allInfo[PWD + f] = []
            for subf in os.listdir(sub) :
                if os.path.isfile(os.path.join(sub, subf)) :
                    allInfo[PWD + f].append(subf)
    return allInfo
    
def printHTMLTag() :
    htmlText = '<div class="right">'
    platformCnt = 1
    info = extract()
    for path in info.keys() :
        text = os.path.basename(path)
        htmlText = htmlText + '''<p><a href='###' onclick="openShutManager(this, '{}', false, '{}', '{}')">{}</a></p>'''.format('platform' + str(platformCnt), text, text, text)
        htmlText = htmlText + '<div id="{}" style="display:none;padding-left:20px">'.format('platform' + str(platformCnt))
        for title in info[path] :
            htmlText = htmlText + getTag(os.path.splitext(title)[0], './' + os.path.basename(path) + '/' + title)
        htmlText = htmlText + '</div>'
        platformCnt += 1
    htmlText = htmlText + '</div>'
    return htmlText

def hide() :
    '''实现条目的展开和折叠功能'''
    hidefunc = '''
    <script type="text/javascript">
    function openShutManager(oSourceObj,oTargetObj,shutAble,oOpenTip,oShutTip){  
        var sourceObj = typeof oSourceObj == "string" ? document.getElementById(oSourceObj) : oSourceObj;  
        var targetObj = typeof oTargetObj == "string" ? document.getElementById(oTargetObj) : oTargetObj;  
        var openTip = oOpenTip || "";  
        var shutTip = oShutTip || "";  
        if(targetObj.style.display!="none"){  
            if(shutAble) return;  
            targetObj.style.display="none";  
            if(openTip  &&  shutTip){  
                    sourceObj.innerHTML = shutTip;   
            }
        } else {
            targetObj.style.display="block";  
            if(openTip  &&  shutTip){  
                sourceObj.innerHTML = openTip;   
            }  
        } 
    }  
    </script>
    '''   
    return hidefunc;

if __name__ == '__main__' :
    with open('./index.html', 'w+') as index :
        index.write(head)
        index.write('<body>')
        index.write(abstract)
        index.write(printHTMLTag())
        index.write(hide())
        index.write('</body></html>')


