#include <stdio.h>
#include <stdlib.h>

int janken(int answer);
int GetRandom(int min, int max);

int main(void)
{
	int answer = 0;
	printf("数字当てゲームを行います。\n");
	printf("1～10の間で入力：");
	scanf("%d", &answer);

	int result = 0;

	janken(answer);

	return 0;
}

int janken(int answer)
{
	int result = 0;

	srand((unsigned int)time(NULL));
	result = GetRandom(1, 10);

	printf("%d\n", result);

	while (result != answer) {
		printf("もう一度：");
		scanf("%d", &answer);
		result = GetRandom(1, 10);
	}

	printf("当たり！！！！！！！\n");
	printf("ぴゃーーーーぴゃっぴゃっぴゃっぴゃぺぺぺぺぺ\n");

	return 0;
}

int GetRandom(int min, int max)
{
	return min + (int)(rand() * (max - min + 1.0) / (1.0 + RAND_MAX));
}