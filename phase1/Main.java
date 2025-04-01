/*
    Name: Jonathan Strong
    Course: CS 3345.503
    Description: This code takes in an integer > 1 and then prints all prime
    numbers up to and including n using the "Sieve of Erotosthenes"
 */
import java.util.*;
import java.lang.Math;

public class Main {
    public static void main(String[] args) {
        Scanner scnr = new Scanner(System.in);
        System.out.print("Enter in an integer > 1: ");
        int n = scnr.nextInt();

        //Loop that runs until user enters in a valid integer.
        while (n <= 1) {
            System.out.println("You entered an invalid integer please try again");
            n = scnr.nextInt();
        }

        //Creating an array of size n and sets all values to true.
        Boolean[] A = new Boolean[n];
        for (int i = 0; i < n; i++) {
            A[i] = true;
        }

        //Loop that checks if A[i] is true and if it is then it turns all
        //multiple of i to false using a nested loop.
        for (int i = 2; i < Math.sqrt(n); i++) {
            if (A[i]) {
                for (int j = i * i; j < n; j += i) {
                    A[j] = false;
                }
            }
        }

        //Loop that prints out all values i of A that are true
        System.out.print("All prime numbers up to and including n: ");
        for (int i = 2; i < n; i++) {
            if (i == 2) {
                System.out.print(i);
            } else if (A[i]) {
                System.out.print(", " + i);
            }
        }
    }
}