#!/usr/bin/env python3
import math

# Reflectance values (%)
reflectance = [
    1.3847, 1.4104, 1.4395, 1.4674, 1.5025, 1.4546, 1.4525, 1.4577, 1.4516, 1.4953,
    1.4629, 1.4082, 1.4507, 1.4423, 1.4347, 1.4428, 1.4389, 1.4344, 1.4273, 1.4481,
    1.4225, 1.4378, 1.4179, 1.4179, 1.4179, 1.4179, 1.4179, 1.4179, 1.4179, 1.4179, 1.4179
]

# CIE 1931 2° Standard Observer (from code)
cie_curves = [
    (0.0143, 0.0004, 0.0679),
    (0.0348, 0.0012, 0.1665),
    (0.0648, 0.0023, 0.2651),
    (0.0988, 0.0038, 0.3560),
    (0.1327, 0.0060, 0.4149),
    (0.1689, 0.0091, 0.4457),
    (0.1958, 0.0135, 0.4310),
    (0.2211, 0.0197, 0.3650),
    (0.2359, 0.0283, 0.2720),
    (0.2311, 0.0379, 0.1750),
    (0.2055, 0.0468, 0.0844),
    (0.1669, 0.0540, 0.0385),
    (0.1222, 0.0608, 0.0189),
    (0.0822, 0.0680, 0.0084),
    (0.0412, 0.0748, 0.0018),
    (0.0118, 0.0818, 0.0000),
    (0.0000, 0.0889, 0.0000),
    (0.0000, 0.0959, 0.0000),
    (0.0000, 0.1029, 0.0000),
    (0.0000, 0.1098, 0.0000),
    (0.0000, 0.1163, 0.0000),
    (0.0000, 0.1222, 0.0000),
    (0.0000, 0.1278, 0.0000),
    (0.0000, 0.1330, 0.0000),
    (0.0000, 0.1376, 0.0000),
    (0.0000, 0.1418, 0.0000),
    (0.0000, 0.1455, 0.0000),
    (0.0000, 0.1488, 0.0000),
    (0.0000, 0.1515, 0.0000),
    (0.0000, 0.1537, 0.0000),
    (0.0000, 0.1553, 0.0000)
]

# D65 2° Standard Illuminant spectrum (CIE standard values)
d65_spectrum = [
    49.9755, 52.3118, 54.6482, 68.7015, 78.2850,
    89.3674, 90.9480, 86.6823, 104.8650, 117.0750,
    117.4120, 114.9010, 115.9240, 108.8030, 109.3560,
    107.7920, 104.7650, 107.6010, 104.4050, 104.0200,
    100.0030, 96.3342, 95.7880, 88.6856, 90.0062,
    89.5991, 87.1445, 83.2854, 83.6992, 81.8587,
    82.4497
]

# D65 reference white point (2° observer)
Xn = 95.0489
Yn = 100.0
Zn = 108.8840

print("=" * 50)
print("D65 2° CALCULATION")
print("=" * 50)

# Step 1: Calculate normalization constant k
sum_Sy = sum(d65_spectrum[i] * cie_curves[i][1] for i in range(len(reflectance)))
k = Yn / sum_Sy
print(f"Σ(S*y) = {sum_Sy:.6f}")
print(f"k = Yn / Σ(S*y) = {k:.6f}\n")

# Step 2: Integrate reflectance * illuminant * CIE curves
R_norm = [r / 100.0 for r in reflectance]  # Convert % to 0-1

sum_X = sum(d65_spectrum[i] * R_norm[i] * cie_curves[i][0] for i in range(len(reflectance)))
sum_Y = sum(d65_spectrum[i] * R_norm[i] * cie_curves[i][1] for i in range(len(reflectance)))
sum_Z = sum(d65_spectrum[i] * R_norm[i] * cie_curves[i][2] for i in range(len(reflectance)))

print(f"Integration sums:")
print(f"  Σ(S*R*x̄) = {sum_X:.6f}")
print(f"  Σ(S*R*ȳ) = {sum_Y:.6f}")
print(f"  Σ(S*R*z̄) = {sum_Z:.6f}\n")

# Step 3: Apply normalization
X = k * sum_X
Y = k * sum_Y
Z = k * sum_Z

print(f"Reflectance factors (0-100 scale):")
print(f"  X = {X:.6f}")
print(f"  Y = {Y:.6f}")
print(f"  Z = {Z:.6f}\n")

# Step 4: Normalize by reference white
xr = (X / 100.0) / (Xn / 100.0)
yr = (Y / 100.0) / (Yn / 100.0)
zr = (Z / 100.0) / (Zn / 100.0)

print(f"Normalized by reference white:")
print(f"  x_r = X / Xn = {xr:.6f}")
print(f"  y_r = Y / Yn = {yr:.6f}")
print(f"  z_r = Z / Zn = {zr:.6f}\n")

# Step 5: Convert to LAB using CIE formula
delta = 6.0 / 29.0
delta2 = delta * delta
delta3 = delta2 * delta

def f(t):
    if t > delta3:
        return t ** (1/3)
    else:
        return (1.0 / (3.0 * delta2)) * t + (4.0 / 29.0)

fx = f(xr)
fy = f(yr)
fz = f(zr)

L = 116.0 * fy - 16.0
a = 500.0 * (fx - fy)
b = 200.0 * (fy - fz)

print(f"CIELAB conversion:")
print(f"  f(x_r) = {fx:.6f}")
print(f"  f(y_r) = {fy:.6f}")
print(f"  f(z_r) = {fz:.6f}\n")

print(f"=" * 50)
print(f"FINAL LAB VALUES (D65 2°):")
print(f"  L* = {L:.2f}")
print(f"  a* = {a:.2f}")
print(f"  b* = {b:.2f}")
print(f"=" * 50)

