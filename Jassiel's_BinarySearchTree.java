/**
 * @author rbk, sa
 * Binary search tree (starter code)
 **/

// replace package name with your netid
package JXL190095;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;
import java.util.Scanner;



public class BinarySearchTree<T extends Comparable<? super T>> implements Iterable<T> {
    static class Entry<T> {
        T element;
        Entry<T> left, right;

        public Entry(T x, Entry<T> left, Entry<T> right) {
            this.element = x;
            this.left = left;
            this.right = right;
        }
    }

    Entry<T> root;
    int size;
    // define stack
    Deque<Entry<T>> stk = new ArrayDeque<>();
    
    public BinarySearchTree() {
        root = null;
        size = 0;
    }

    /*	Find function that clears and starts stack path
     * 	to an element e
     */
    public Entry<T> find(T e){
    	stk.clear();
    	stk.push(root);
    	return find(root, e);
    }
    /*Find function that finds an element x 
     * starting at a specified node t
     */
    public Entry<T> find(Entry<T> t, T x){

    	//if entry is empty or equals our desired element return t
    	if (t == null || t.element.equals(x)) return t; 
    	
    	//LI: while an t has no empty childs proceed down the tree depending on x until
    	// and break once we hit a leaf node
    	while(true) {
    		// if t is greater than x go to left child
    		if (t.element.compareTo(x) > 0) {
    	        //if t's left child is empty break
    			if(t.left == null) break;
    	        //push t for path and go to left child
    			stk.push(t);
        		t = t.left;
    	      	}
        	//if t is equal to our t break and return t
    		else if (t.element.equals(x)) {
        		break;
        	}
        	//else if t's right child is empty break and return t
    		else if (t.right == null) break;
        	//else push t for path and navigate to the right
    		else {
        		stk.push(t);
        		t = t.right;
        	}
    	}
    	//if at end, return node at failure, or node t
    	return t;
    }

    
    
    /** TO DO: Is x contained in tree?
     */
    public boolean contains(T x) {
       // if our tree is empty return false
    	if(size == 0) return false;
    	//instantiate e and attempt to find x
       Entry<T> e;
       e = find(x);
       //if e is empty or not equal to x return false
       if(e == null || !e.element.equals(x)) {
    	   return false;
       }
       //else x is found so return true
       return true;
    }

    /*	Add method to add x, if x is present do not add duplicate
     * 
     */
    public boolean add(T x) {
    	//if tree is empty, make x our root, increase size, and 
    	//return a successful add
    	if (size == 0) {
    		Entry<T> e =  new Entry<T>(x, null , null);
    		root = e;
    		size++;
    		return true;
    	}
    	//else try to find x 
    	else {
    		Entry<T> t = find(x);
    		//if x is in the tree return false
    		if (t.element.equals(x)) return false;
    		//if t is greater than x go left
    		if(t.element.compareTo(x) > 0) {
    			//since t is greater than x make x left child of t
    			Entry<T> l =  new Entry<T>(x,null,null);
    			t.left = l;
    			size++;
    		}
    		//else t is less than x make x right child of t and increase size
    		else {
    			Entry<T> r =  new Entry<T>(x, null, null);
    			t.right = r;
    			size++;
    			return true;
    		}
    	}
    	//addition is successful 
    	return true;
    }

    /** TO DO: Remove x from tree. 
     *  Return x if found, otherwise return null
     */
    public T remove(T x) {
        //if tree is empty return null
    	if(size == 0) return null;
    	//temporary variable that looks for x
    	Entry<T> e = find(x);
        //if x is not found return null
    	if (!e.element.equals(x)) {
        	return null;
        }
    	//if e has a null child splice at e
    	if (e.left == null || e.right == null) {
    		splice(e);
    	}
    	else {
    		//push e into stack
    		stk.push(e);
    		//find smallest node in right subtree
    		Entry<T> minRight = find(e.right, x);
    		//replace e with minRight
    		e.element = minRight.element;
    		//splice minRight after replacement
    		splice(minRight);
    	}
    	//reduce size of tree
    	size--;
    	//return x
    	return x;
    }
    //helper method used in remove to cut and connect at some node T
    public void splice(Entry<T> t) {
    	
    	//the parent of entry t
    	Entry<T> parent = stk.peek();
    	//if t does not have a left child then child = right child otherwise child = t.left
    	Entry<T> child = (t.left == null ? t.right:t.left);
    	//if parent is empty replace root with child
    	if (parent == null) root = child;
    	//else if t is left child then child of t is new left node of parent
    	else if(parent.left == t) parent.left = child;
    	//else child is right node of parent
    	else parent.right = child;
    }
 


// Start of Optional problems

    /** Optional problem : Iterate elements in sorted order of keys
     Solve this problem without creating an array using in-order traversal (toArray()).
     */
    public Iterator<T> iterator() {
        return null;
    }

    // Optional problem
    public T min() {
        return null;
    }

    public T max() {
        return null;
    }

    // Optional problem.  Find largest key that is no bigger than x.  Return null if there is no such key.
    public T floor(T x) {
        return null;
    }

    // Optional problem.  Find smallest key that is no smaller than x.  Return null if there is no such key.
    public T ceiling(T x) {
        return null;
    }

    // Optional problem.  Find predecessor of x.  If x is not in the tree, return floor(x).  Return null if there is no such key.
    public T predecessor(T x) {
        return null;
    }

    // Optional problem.  Find successor of x.  If x is not in the tree, return ceiling(x).  Return null if there is no such key.
    public T successor(T x) {
        return null;
    }

   // Optional: Create an array with the elements using in-order traversal of tree
    public Comparable[] toArray() {
        Comparable[] arr = new Comparable[size];
        /* write code to place elements in array here */
        return arr;
    }
	
// End of Optional problems

    public static void main(String[] args) throws FileNotFoundException {
        BinarySearchTree<Long> bst = new BinarySearchTree<>();
        Scanner sc;
        if (args.length > 0) {
            File file = new File(args[0]);
            sc = new Scanner(file);
        } else {
            sc = new Scanner(System.in);
        }
//        File file = new File("bst-t03.txt");
//        	sc = new Scanner(file);
        String operation = "";
        long operand = 0;
        int modValue = 999983;
        long result = 0;
        // Initialize the timer
        Timer timer = new Timer();

        while (!((operation = sc.next()).equals("End"))) {
            switch (operation) {
                case "Add": {
                    operand = sc.nextInt();
                    if (bst.add(operand)) {
                        result = (result + 1) % modValue;
                    }
                    break;
                }
                case "Remove": {
                    operand = sc.nextInt();
                    if (bst.remove(operand) != null) {
                        result = (result + 1) % modValue;
                    }
                    break;
                }
                case "Contains": {
                    operand = sc.nextInt();
                    if (bst.contains(operand)) {
                        result = (result + 1) % modValue;
                    }
                    break;
                }
            }
        }

        // End Time
        timer.end();
        //bst.printTree();
        System.out.println(result);
        System.out.println(timer);
    }


    public void printTree() {
        System.out.print("[" + size + "]");
        printTree(root);
        System.out.println();
    }

    // Inorder traversal of tree
    void printTree(Entry<T> node) {
        if (node != null) {
            printTree(node.left);
            System.out.print(" " + node.element);
            printTree(node.right);
        }
    }
}




