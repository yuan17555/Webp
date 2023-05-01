import time
import numpy as np
import random


class Game:
    def __init__(self):
        self.initial_game()

    def initial_game(self):
        self.current_state = np.array([["+"]*8]*8)
        self.player_turn = "A"
        self.userA_chesses = ["A", "B", "C", "e", "f", "g"]
        self.userX_chesses = ["X", "Y", "Z", "u", "v", "w"]

        self.userX_detect_chesses=np.zeros((6, 5, 5))
        self.userX_detect_chesses = self.userX_detect_chesses.astype(int)
        # every 2D matrix would be like: (every element is actually '0', but sign it with other character)
        # [[* * 0 * *]
        #  [* 0 0 0 *]
        #  [0 0 @ 0 0]
        #  [* 0 0 0 *]
        #  [* * 0 * *]]
        # * means no meaning, 0 means valid meaning, @ means itself

        self.userX_danger_chesses=np.zeros((6))

        # A方輸入chess
        i = 0
        while(i < 6):
            x = int(input(self.userA_chesses[i]+"_X:"))
            y = int(input(self.userA_chesses[i]+"_Y:"))
            if 0 <= x <= 7 and 0 <= y <= 7 and self.current_state[y][x] == "+":
                self.current_state[y][x] = self.userA_chesses[i]
                i += 1
            else:
                print("please try again to input value")

        # X方輸入chess
        j = 0
        while(j < 6):
            x = int(input(self.userX_chesses[j]+"_X:"))
            y = int(input(self.userX_chesses[j]+"_Y:"))
            if 0 <= x <= 7 and 0 <= y <= 7 and self.current_state[y][x] == "+":
                self.current_state[y][x] = self.userX_chesses[j]
                j += 1
            else:
                print("please try again to input value")

    def draw_board(self):
        print(" ", end=" ")
        for i in range(8):
            print(i, end=" ")
        print()
        for j in range(8):
            print(j, end=" ")
            for k in range(8):
                print(self.current_state[j][k], end=" ")
            print()

    def is_valid(self, chess, px, py):
        # 這裡會檢查輸入的旗子是否在場上 在場上可以移動 輸入旗子不再場上就return false
        position = np.where(self.current_state == chess)
        if len(position[0]) == 0 or px > 7 or px < 0 or py > 7 or py < 0:
            return False
        else:
            position_y = int(position[0])
            position_x = int(position[1])

        # 輸入原位置視為無效移動
        if position_x == px and position_y == py:
            return False

        # 判斷正在移動的棋方有哪些棋子
        user_turn = self.userA_chesses if self.player_turn == "A" else self.userX_chesses
        enemy_chess = self.userX_chesses if self.player_turn == "A" else self.userA_chesses

        if chess == "A" or chess == "X":
            # 檢查欲移動位置是否存在我方棋子 如果存在我方旗子不能移動 如果為空可以移動 如果存在敵方旗子可移動
            if self.current_state[py][px] not in user_turn:  # 該位置為空，或有敵方棋子
                if position_x == px:  # 上下可移動兩步
                    if position_y-2 < 0:
                        start_y = 0
                    else:
                        start_y = position_y-2
                    if position_y+2 > 7:
                        end_y = 7
                    else:
                        end_y = position_y+2
                    if start_y <= py <= end_y:
                        # 檢查移動有無跨越棋子
                        if self.have_middle_chess(position_x, position_y, px, py) == True and self.player_turn == "A":
                            print("You can't cross a chess.")
                            return False
                        # 吃掉敵方棋子
                        if self.current_state[py][px] in enemy_chess:
                            print(self.current_state[py][px], "is eaten.")
                            if self.player_turn == "A":
                                self.refresh_detect(self.current_state[py][px])
                                self.userX_chesses.remove(self.current_state[py][px])
                                print(self.userX_chesses)
                            elif self.player_turn == "X":
                                self.userA_chesses.remove(self.current_state[py][px])
                            print("You: ", self.userA_chesses)
                            print("Enemy: ", self.userX_chesses)
                        return True
                    else:
                        return False
                elif position_y == py:  # 左右可移動兩步
                    if position_x-2 < 0:
                        start_x = 0
                    else:
                        start_x = position_x-2
                    if position_x+2 > 7:
                        end_x = 7
                    else:
                        end_x = position_x+2
                    if start_x <= px <= end_x:
                        # 檢查移動有無跨越棋子
                        if self.have_middle_chess(position_x, position_y, px, py) == True and self.player_turn == "A":
                            print("You can't cross a chess.")
                            return False
                        # 吃掉敵方棋子
                        if self.current_state[py][px] in enemy_chess:
                            print(self.current_state[py][px], "is eaten.")
                            if self.player_turn == "A":
                                self.refresh_detect(self.current_state[py][px])
                                self.userX_chesses.remove(self.current_state[py][px])
                                print(self.userX_chesses)
                            elif self.player_turn == "X":
                                self.userA_chesses.remove(self.current_state[py][px])
                            print("You: ", self.userA_chesses)
                            print("Enemy: ", self.userX_chesses)
                        return True
                    else:
                        return False
                else:
                    return False
            else:
                if self.player_turn == "A":
                    print("You can't eat your own chess.")
                return False

        elif chess == "B" or chess == "C" or chess == "Y" or chess == "Z":
            # 檢查欲移動位置是否存在我方棋子 如果存在我方旗子不能移動 如果為空可以移動 如果存在敵方旗子可移動
            if self.current_state[py][px] not in user_turn:  # 該位置為空，或有敵方棋子
                if abs(position_x - px) != abs(position_y - py):  # 斜向移動，至多兩格
                    return False
                elif abs(position_x - px) > 2:
                    return False
                else:
                    # 檢查移動有無跨越棋子
                    if self.have_middle_chess(position_x, position_y, px, py) == True and self.player_turn == "A":
                        print("You can't cross a chess.")
                        return False
                    # 吃掉敵方棋子
                    if self.current_state[py][px] in enemy_chess:
                        print(self.current_state[py][px], "is eaten.")
                        if self.player_turn == "A":
                            self.refresh_detect(self.current_state[py][px])
                            self.userX_chesses.remove(self.current_state[py][px])
                        elif self.player_turn == "X":
                            self.userA_chesses.remove(self.current_state[py][px])
                        print("You: ", self.userA_chesses)
                        print("Enemy: ", self.userX_chesses)
                    return True
            else:
                if self.player_turn == "A":
                    print("You can't eat your own chess.")
                return False

        elif chess == "e" or chess == "f" or chess == "g" or chess == "u" or chess == "v" or chess == "w":
            # 檢查欲移動位置是否存在我方棋子 如果存在我方旗子不能移動 如果為空可以移動 如果存在敵方旗子可移動
            if self.current_state[py][px] not in user_turn:  # 該位置為空，或有敵方棋子
                if position_x == px:  # 上下 move
                    if position_y-1 < 0:
                        start_y = 0
                    else:
                        start_y = position_y-1
                    if position_y+1 > 7:
                        end_y = 7
                    else:
                        end_y = position_y+1
                    if start_y <= py <= end_y:
                        # 吃掉敵方棋子
                        if self.current_state[py][px] in enemy_chess:
                            print(self.current_state[py][px], "is eaten.")
                            if self.player_turn == "A":
                                self.refresh_detect(self.current_state[py][px])
                                self.userX_chesses.remove(self.current_state[py][px])
                            elif self.player_turn == "X":
                                self.userA_chesses.remove(self.current_state[py][px])
                            print("You: ", self.userA_chesses)
                            print("Enemy: ", self.userX_chesses)
                        return True
                    else:
                        return False
                elif position_y == py:  # 左右 move
                    if position_x-1 < 0:
                        start_x = 0
                    else:
                        start_x = position_x-1
                    if position_x+1 > 7:
                        end_x = 7
                    else:
                        end_x = position_x+1
                    if start_x <= px <= end_x:
                        # 吃掉敵方棋子
                        if self.current_state[py][px] in enemy_chess:
                            print(self.current_state[py][px], "is eaten.")
                            if self.player_turn == "A":
                                self.refresh_detect(self.current_state[py][px])
                                self.userX_chesses.remove(self.current_state[py][px])
                                print(self.userX_chesses)
                            elif self.player_turn == "X":
                                self.userA_chesses.remove(self.current_state[py][px])
                            print("You: ", self.userA_chesses)
                            print("Enemy: ", self.userX_chesses)
                        return True
                    else:
                        return False
                else:
                    return False
            else:
                if self.player_turn == "A":
                    print("You can't eat your own chess.")
                return False

        else:
            return False

    def move(self, chess, px, py):
        position = np.where(self.current_state == chess)
        position_y = int(position[0])
        position_x = int(position[1])
        self.current_state[position_y][position_x] = "+"
        self.current_state[py][px] = chess

    def AI_generate_chess_index(self):
        vaild_falg = False
        while not vaild_falg:
            # 選擇移動棋子
            chess_index = random.randint(0, len(self.userX_chesses)-1)
            chess = self.userX_chesses[chess_index]

            # 選擇移動方式
            if chess == "X":
                move_range = [[0, 1], [0, -1], [1, 0],[-1, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]
                move_index = random.randrange(8)
                moving = move_range[move_index]
            elif chess == "Y" or chess == "Z":
                move_range = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
                move_index = random.randrange(4)
                moving = move_range[move_index]
            else:
                move_range = [[0, 1], [0, -1], [1, 0], [-1, 0]]
                move_index = random.randrange(4)
                moving = move_range[move_index]

            position = np.where(self.current_state == chess)
            if len(position[0]) != 0:
                position_y = int(position[0])+moving[1]
                position_x = int(position[1])+moving[0]
                vaild_falg = self.is_valid(chess, position_x, position_y)

        return chess, position_x, position_y

    def zero_chess(self):
        if len(self.userA_chesses) == 0:
            print("You LOSE...")
            return True
        elif len(self.userX_chesses) == 0:
            print("You WIN!")
            return True
        else:
            return False

    def have_middle_chess(self, position_x, position_y, px, py):

        if (position_x+px) % 2 == 0 and (position_y+py) % 2 == 0:
            m_x = int((position_x+px)/2)
            m_y = int((position_y+py)/2)
            if self.current_state[m_y][m_x] in self.userA_chesses:
                return True
            elif self.current_state[m_y][m_x] in self.userX_chesses:
                return True
            else:
                return False
        else:
            return False
        
    def evaluate(self,chess):
        
        # self.userX_chesses = ["X", "Y", "Z", "u", "v", "w"]
        #                        0    1    2    3    4    5

        # self.userX_danger_chesses=np.zeros((6))

        # self.userX_detect_chesses=np.zeros((6, 5, 5))
        # every 2D matrix would be like: (every element is actually '0', but sign it with other character)
        #     0 1 2 3 4
        # 0 [[* * 0 * *]
        # 1  [* 0 0 0 *]
        # 2  [0 0 @ 0 0]
        # 3  [* 0 0 0 *]
        # 4  [* * 0 * *]]
        # * means no meaning, 0 means valid meaning, @ means itself

        position=np.where(self.current_state==chess)
        position_y=int(position[0])
        position_x=int(position[1])

        if(chess=="X"): chess_counter=0
        elif(chess=="Y"): chess_counter=1
        elif(chess=="Z"): chess_counter=2
        elif(chess=="u"): chess_counter=3
        elif(chess=="v"): chess_counter=4
        elif(chess=="w"): chess_counter=5
        else: print("chess_counter error")

        correction = 2  # for matrix position correcting

        for y_counter in range(2, -3 ,-1):
            if(y_counter%2==0):  # y_counter = 2 or -2
                x_counter=0
                if self.is_valid(chess,position_x+x_counter,position_y+y_counter)==True:
                    if self.current_state[position_y+y_counter,position_x+x_counter] in self.userA_chesses:
                        # delta_set = {(0,2), (0,-2)}
                        self.userX_detect_chesses[chess_counter][4-(y_counter+correction)][x_counter+correction]==1
            elif(y_counter%1==0):  # y_counter = 1 or -1
                for x_counter in range(-1 ,2 ,1):
                    if self.is_valid(chess,position_x+x_counter,position_y+y_counter)==True:
                        if self.current_state[position_y+y_counter,position_x+x_counter] in self.userA_chesses:
                            # delta_set = {(1,-1), (1,0), (1,1), (-1,-1), (-1,0), (-1,1)}
                            self.userX_detect_chesses[chess_counter][4-(y_counter+correction)][x_counter+correction]==1
            else:  # y_counter = 0
                for x_counter in range(-2, 3 ,1):
                    if x_counter != 0:
                        if self.is_valid(chess,position_x+x_counter,position_y+y_counter)==True:
                            if self.current_state[position_y+y_counter,position_x+x_counter] in self.userA_chesses:
                                # delta_set = {(0,-2), (0,-1), (0,1), (0,2)}
                                self.userX_detect_chesses[chess_counter][4-(y_counter+correction)][x_counter+correction]==1
        
        for chess_counter in range(0, 6, 1):
            self.userX_danger_chesses[chess_counter]=np.sum(self.userX_detect_chesses[chess_counter, :, :])

    def AI_generate_chess_index_with_evaluate(self):
        max_index = np.argmax(self.userX_danger_chesses)
        chess=self.userX_chesses[max_index]

        correction = 2  # for matrix position correcting
        
        # self.userX_detect_chesses=np.zeros((6, 5, 5))
        # every 2D matrix would be like: (every element is actually '0', but sign it with other character)
        #     0 1 2 3 4
        # 0 [[* * 0 * *]
        # 1  [* 0 0 0 *]
        # 2  [0 0 @ 0 0]
        # 3  [* 0 0 0 *]
        # 4  [* * 0 * *]]
        # * means no meaning, 0 means valid meaning, @ means itself

        is_empty = 1

        # 選擇移動的棋子
        if chess == "X":
            move_range = [[0, 1], [0, -1], [1, 0], [-1, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]
            for y_counter in range(2,-3,-1):
                for x_counter in range(-2,3,1):
                    if self.userX_detect_chesses[1][4-(y_counter+correction)][x_counter+correction]==1:
                        for counter in range(8):
                            temp_arr=[x_counter,y_counter]
                            if np.array_equal(move_range[counter], temp_arr):
                                moving = move_range[counter]
                                is_empty = 0
            if is_empty==1:
                vaild_falg = False
                while not vaild_falg:
                    move_index = random.randrange(8)
                    moving = move_range[move_index]
                    position = np.where(self.current_state == chess)
                    if len(position[0]) != 0:
                        position_y = int(position[0])+moving[1]
                        position_x = int(position[1])+moving[0]
                        vaild_falg = self.is_valid(chess, position_x, position_y)
                return chess, position_x, position_y
            
        elif chess == "Y" or chess == "Z":
            move_range = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
            for y_counter in range(2,-3,-1):
                for x_counter in range(-2,3,1):
                    if self.userX_detect_chesses[1][4-(y_counter+correction)][x_counter+correction]==1:
                        for counter in range(4):
                            temp_arr=[x_counter,y_counter]
                            if np.array_equal(move_range[counter], temp_arr):
                                moving = move_range[counter]
                                is_empty = 0
            if is_empty==1:
                vaild_falg = False
                while not vaild_falg:
                    move_index = random.randrange(4)
                    moving = move_range[move_index]
                    position = np.where(self.current_state == chess)
                    if len(position[0]) != 0:
                        position_y = int(position[0])+moving[1]
                        position_x = int(position[1])+moving[0]
                        vaild_falg = self.is_valid(chess, position_x, position_y)
                return chess, position_x, position_y
            
        else:
            move_range = [[0, 1], [0, -1], [1, 0], [-1, 0]]
            for y_counter in range(2,-3,-1):
                for x_counter in range(-2,3,1):
                    if self.userX_detect_chesses[1][4-(y_counter+correction)][x_counter+correction]==1:
                        for counter in range(4):
                            temp_arr=[x_counter,y_counter]
                            if np.array_equal(move_range[counter], temp_arr):
                                moving = move_range[counter]
                                is_empty = 0
            if is_empty==1:
                vaild_falg = False
                while not vaild_falg:
                    move_index = random.randrange(8)
                    moving = move_range[move_index]
                    position = np.where(self.current_state == chess)
                    if len(position[0]) != 0:
                        position_y = int(position[0])+moving[1]
                        position_x = int(position[1])+moving[0]
                        vaild_falg = self.is_valid(chess, position_x, position_y)
                return chess, position_x, position_y

        position = np.where(self.current_state == chess)
        if len(position[0]) != 0:
            position_y = int(position[0])+moving[1]
            position_x = int(position[1])+moving[0]

        return chess, position_x, position_y

    def refresh_detect(self,chess):
        if(chess=="X"): chess_counter=0
        elif(chess=="Y"): chess_counter=1
        elif(chess=="Z"): chess_counter=2
        elif(chess=="u"): chess_counter=3
        elif(chess=="v"): chess_counter=4
        elif(chess=="w"): chess_counter=5
        else: print("chess_counter error")
        self.userX_detect_chesses[chess_counter][:][:] = 0

def main():
    g = Game()
    g.draw_board()
    totalTime = round(0, 7)

    while(1):

        print(" ")

        # A代表下棋者為使用者
        while g.player_turn == "A":
            chess = input("chess:")
            # 跳出並結束棋局
            if chess == "end":
                print("Game Over.")
                return
            px = int(input("X:"))
            py = int(input("Y:"))

            # 初步檢查輸入旗子是否在棋盤範圍內 和是否輸入屬於自己的旗子
            if 0 <= px <= 7 and 0 <= py <= 7 and chess in g.userA_chesses:
                if g.is_valid(chess, px, py):
                    # 檢查輸入旗子是否符合規則
                    g.move(chess, px, py)
                    g.draw_board()
                    # X代表下棋者為AI
                    g.player_turn = "X"
                else:
                    print("error moving rule , please try again")
            else:
                print("error index , please try again")

        if g.zero_chess():
            break

        print(" ")

        if g.player_turn == "X":
            # AI產生回應以及回應時間
            start = time.time()

            if len(g.userX_chesses) != 0:
                for i in range(len(g.userX_chesses)):
                    g.evaluate(g.userX_chesses[i])

            mychess, dx, dy = g.AI_generate_chess_index_with_evaluate()
            end = time.time()
            totalTime += round(end - start, 7)

            print('Evaluation time: {}s'.format(round(end - start, 7)))
            print('Total evaluation time: {}s'.format(round(totalTime, 7)))
            g.move(mychess, dx, dy)
            print("AI chess: ", mychess, " dx:", dx, " dy:", dy)
            g.draw_board()

            # 換user
            g.player_turn = "A"

        if g.zero_chess():
            break


if __name__ == "__main__":
    main()
