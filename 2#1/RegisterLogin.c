#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h> 

// Struktur untuk menyimpan data user
struct User {
    char nama[50];
    char email[50];
    char no_hp[15];
    char alamat[100];
    char password[20];
};

// Variabel global untuk menyimpan user terdaftar
struct User registered_user;

int is_registered = 0; // Flag untuk menandakan apakah user sudah registrasi

// Fungsi untuk validasi email (harus mengandung '@')
int validasi_email(char email[]) {
    if (strchr(email, '@') != NULL) {
        return 1; // Valid
    }
    return 0; // Tidak valid
}

// Fungsi untuk validasi nomor telepon (harus angka)
int validasi_no_hp(char no_hp[]) {
    for (int i = 0; i < strlen(no_hp); i++) {
        if (!isdigit(no_hp[i])) {
            return 0; // Tidak valid
        }
    }
    return 1; // Valid
}

// Fungsi untuk registrasi user
void registrasi() {
    struct User temp_user;
    char confirm_password[20];
    
    printf("\n----- REGISTRASI -----\n");
    
    printf("Masukkan Nama: ");
    fgets(temp_user.nama, 50, stdin);
    temp_user.nama[strcspn(temp_user.nama, "\n")] = 0; 
    
    // Validasi email
    do {
        printf("Masukkan Email: ");
        fgets(temp_user.email, 50, stdin);
        temp_user.email[strcspn(temp_user.email, "\n")] = 0; 
        if (!validasi_email(temp_user.email)) {
            printf("\nEmail tidak valid. Harus mengandung '@'. Silakan coba lagi.\n");
        }
    } while (!validasi_email(temp_user.email));
    
    // Validasi nomor telepon
    do {
        printf("Masukkan No HP: ");
        fgets(temp_user.no_hp, 15, stdin);
        temp_user.no_hp[strcspn(temp_user.no_hp, "\n")] = 0; 
        if (!validasi_no_hp(temp_user.no_hp)) {
            printf("\nNomor HP tidak valid. Harus terdiri dari angka saja. Silakan coba lagi.\n");
        }
    } while (!validasi_no_hp(temp_user.no_hp));
    
    printf("Masukkan Alamat: ");
    fgets(temp_user.alamat, 100, stdin);
    temp_user.alamat[strcspn(temp_user.alamat, "\n")] = 0; 
    
    printf("Masukkan Password: ");
    fgets(temp_user.password, 20, stdin);
    temp_user.password[strcspn(temp_user.password, "\n")] = 0; 
    
    printf("Konfirmasi Password: ");
    fgets(confirm_password, 20, stdin);
    confirm_password[strcspn(confirm_password, "\n")] = 0; 
    
    // Cek apakah password dan konfirmasi password sesuai
    if (strcmp(temp_user.password, confirm_password) != 0) {
        printf("\nPassword dan konfirmasi password tidak cocok!\n");
        return;
    }
    
    // Simpan data user yang telah di-registrasi
    registered_user = temp_user;
    is_registered = 1;
    
    printf("\nRegistrasi berhasil!\n");
}

// Fungsi untuk login user
void login() {
    char email[50];
    char password[20];
    
    if (!is_registered) {
        printf("\nBelum ada user yang terdaftar. Silakan registrasi terlebih dahulu.\n");
        return;
    }
    
    printf("\n----- LOGIN -----\n");
    
    printf("Masukkan Email: ");
    fgets(email, 50, stdin);
    email[strcspn(email, "\n")] = 0; 
    
    printf("Masukkan Password: ");
    fgets(password, 20, stdin);
    password[strcspn(password, "\n")] = 0; 
    
    // Verifikasi email dan password
    if (strcmp(email, registered_user.email) == 0 && strcmp(password, registered_user.password) == 0) {
        printf("\nLogin berhasil! Selamat datang, %s.\n", registered_user.nama);
        exit(0); // Menghentikan program setelah login berhasil
    } else {
        printf("\nEmail atau password salah!\n");
    }
}

// Fungsi untuk menampilkan menu
void menu() {
    int pilihan;
    
    do {
        printf("\n===== E-COMMERCE =====\n");
        printf("1. Registrasi\n");
        printf("2. Login\n");
        printf("3. Keluar\n");
        printf("Pilih opsi (1-3): ");
        scanf("%d", &pilihan);
        getchar(); 
        
        switch (pilihan) {
            case 1:
                registrasi();
                break;
            case 2:
                login();
                break;
            case 3:
                printf("\nKeluar dari program\n");
                break;
            default:
                printf("\nPilihan tidak valid. Coba lagi.\n");
        }
    } while (pilihan != 3);
}

int main() {
    menu();
    return 0;
}
