#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import torch.nn as nn

class EnhancedResNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 64)
        self.residual_block = nn.Sequential(
            nn.Linear(64, 64),
            nn.BatchNorm1d(64),  # Batch normalization
            nn.ReLU(),
            nn.Dropout(0.2),  # Dropout with 20% rate
            nn.Linear(64, 64)
        )
        self.fc2 = nn.Linear(64, 8)

    def forward(self, x):
        x = self.fc1(x)
        residual = x
        x = self.residual_block(x)
        x += residual  # Residual connection
        x = nn.ReLU()(x)
        x = self.fc2(x)
        return x
def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geoproject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
