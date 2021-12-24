public class Animal{
    public Puppy(String name){
       //这个构造器仅有一个参数：name
       System.out.println("小狗的名字是 : " + name ); 
    }
    public static void main(String[] args){//程序入口
       // 下面的语句将创建一个Puppy对象
       Puppy myPuppy = new Puppy( "tommy" );//注意与cpp区别
    }
 }