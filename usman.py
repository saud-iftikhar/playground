#!/usr/bin/env sage

# Import required libraries
from sage.crypto.block_cipher.miniaes import MiniAES
from sage.crypto.util import bin_to_ascii, ascii_to_bin

# Function to generate AES session key from last 2 letters of name
def generate_session_key(name):
    # Take last 2 letters of the name
    key_letters = name[-2:]
    print(f"Using letters '{key_letters}' from name '{name}' for session key")
    return key_letters

# Function to convert key to binary and integer representations
def convert_key(key_str):
    # Create BinaryStrings object
    bin_strings = BinaryStrings()
    
    # Convert to binary
    binary_key = bin_strings.encoding(key_str)
    
    # Convert to integer (using ASCII values)
    int_key = 0
    for char in key_str:
        int_key = (int_key << 8) + ord(char)
    
    return binary_key, int_key

# Function to generate RSA keys
def generate_rsa_keys(student_number):
    # Find p (next prime after student number)
    p = next_prime(student_number)
    
    # Find q (previous prime before student number)
    q = previous_prime(student_number)
    
    # Calculate n (modulus)
    n = p * q
    
    # Calculate phi (Euler's totient function)
    phi = (p - 1) * (q - 1)
    
    # Choose e (common value is 65537)
    e = 65537
    
    # Calculate private key d
    d = inverse_mod(e, phi)
    
    # Public key is (e, n)
    # Private key is (d, n)
    return {
        'public_key': (e, n),
        'private_key': (d, n),
        'p': p,
        'q': q,
        'phi': phi
    }

def main():
    # Example usage (replace with your actual name and student number)
    name = "Usman"  # Replace with your name
    student_number = 12345  # Replace with your actual student number
    
    # Generate session key
    session_key = generate_session_key(name)
    print(f"\nGenerated session key: {session_key}")
    
    # Convert key to binary and integer representations
    binary_key, int_key = convert_key(session_key)
    print(f"\nBinary representation: {binary_key}")
    print(f"Integer representation: {int_key}")
    
    # Generate RSA keys
    rsa_keys = generate_rsa_keys(student_number)
    
    print("\nRSA Key Details:")
    print(f"p: {rsa_keys['p']}")
    print(f"q: {rsa_keys['q']}")
    print(f"n (modulus): {rsa_keys['public_key'][1]}")
    print(f"Public key (e, n): {rsa_keys['public_key']}")
    print(f"Private key (d, n): {rsa_keys['private_key']}")

if __name__ == "__main__":
    main()
